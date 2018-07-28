package edu.monash.spring.sso.session;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.datastore.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.session.MapSession;
import org.springframework.session.Session;

import java.util.*;

public class DatastoreSessionMap implements Map<String, Session> {

    protected final Log logger = LogFactory.getLog(this.getClass());

    static final String SESSION_ENTITY_TYPE = "_ah_SESSION";
    static final String VALUES_PROP = "_values";

    private final Datastore datastore;
    private final KeyFactory keyFactory;

    public DatastoreSessionMap() {
        this(null);
    }

    public DatastoreSessionMap(GoogleCredentials credentials) {
        DatastoreOptions.Builder builder = DatastoreOptions.newBuilder();
        if (credentials != null)
            builder.setCredentials(credentials);
        this.datastore = builder.build().getService();
        this.keyFactory = datastore.newKeyFactory().setKind(SESSION_ENTITY_TYPE);
    }

    private Key createKeyBySessionId(String id) {
        return keyFactory.newKey(id);
    }

    private MapSession createSessionFromEntity(Entity entity) {
        MapSession data = new MapSession();

        BlobValue blobValue = entity.getValue(VALUES_PROP);

        Map<String, Object> valueMap = (Map<String, Object>) SessionManagerUtil.deserialize(blobValue.get().toByteArray());

        for (String key : valueMap.keySet()) {
            data.setAttribute(key, valueMap.get(key));
        }
        return data;
    }


    private Entity createEntityForSession(MapSession data) {

        Map<String, Object> valueMap = new HashMap<>();

        for (String attr : data.getAttributeNames()) {
            valueMap.put(attr, data.getAttribute(attr));
        }
        Key key = createKeyBySessionId(data.getId());


        BlobValue.Builder blobBuilder =
                BlobValue.newBuilder(Blob.copyFrom(SessionManagerUtil.serialize(valueMap)));
        blobBuilder.setExcludeFromIndexes(true);

        Entity entity = Entity.newBuilder(key)
                .set(VALUES_PROP, blobBuilder.build())
                .build();
        return entity;
    }

    private Map<String, MapSession> getAllSessions() {
        EntityQuery query = Query.newEntityQueryBuilder().setKind(SESSION_ENTITY_TYPE).build();
        Iterator<Entity> result = datastore.run(query);
        Map<String, MapSession> sessions = new HashMap<>();
        while (result.hasNext()) {
            Entity entity = result.next();
            sessions.put(entity.getKey().getName(), createSessionFromEntity(entity));
        }
        return sessions;
    }

    private void clearAllSessions() {
        EntityQuery query = Query.newEntityQueryBuilder().setKind(SESSION_ENTITY_TYPE).build();
        Iterator<Entity> result = datastore.run(query);
        ArrayList<Key> killList = new ArrayList<>();
        while (result.hasNext()) {
            Entity entity = result.next();
            killList.add(entity.getKey());
        }

        datastore.delete(killList.toArray(new Key[killList.size()]));
    }

    @Override
    public int size() {
        Map<String, MapSession> allSessions = getAllSessions();
        return allSessions.size();
    }

    @Override
    public boolean isEmpty() {
        return this.size() <= 0;
    }

    @Override
    public boolean containsKey(Object key) {
        return this.get(key) != null;
    }

    @Override
    public boolean containsValue(Object value) {
        return this.get(((MapSession) value).getId()) != null;
    }

    @Override
    public MapSession get(Object key) {
        String id = (String) key;
        Entity entity = datastore.get(createKeyBySessionId(id));
        if (entity != null && entity.getKey().hasName()) {

            MapSession result = createSessionFromEntity(entity);
            Object securityContext = result.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
            if (securityContext != null) {
                logger.debug("Successfully fetched stored session with Security Context: " + id);
            } else {
                logger.debug("Successfully fetched stored session, but there is no Security Context: " + id);
            }
            return result;
        } else {
            return null;
        }
    }

    @Override
    public Session put(String key, Session value) {
        ((MapSession) value).setId(key);
        Object securityContext = value.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

        if (securityContext != null) {
            try {
                synchronized (datastore) {
                    datastore.put(createEntityForSession((MapSession) value));
                    logger.debug("Saving a session: " + value.getId());
                    return value;
                }
            } catch (Exception ex) {
                logger.debug("Failed saving a session: " + value.getId(), ex);
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public MapSession remove(Object key) {
        MapSession result = this.get(key);
        datastore.delete(createKeyBySessionId((String) key));
        return result;
    }

    @Override
    public void putAll(Map<? extends String, ? extends Session> m) {
        for (String key : m.keySet()) {
            this.put(key, m.get(key));
        }
    }

    @Override
    public void clear() {
        clearAllSessions();
    }

    @Override
    public Set<String> keySet() {
        Map<String, MapSession> allSessions = getAllSessions();
        return allSessions.keySet();
    }

    @Override
    public Collection<Session> values() {
        Map<String, MapSession> allSessions = getAllSessions();
        return (Collection<Session>) (Collection) allSessions.values();
    }

    @Override
    public Set<Entry<String, Session>> entrySet() {
        Map<String, MapSession> allSessions = getAllSessions();
        return (Set<Entry<String, Session>>) (Set) allSessions.entrySet();
    }
}

