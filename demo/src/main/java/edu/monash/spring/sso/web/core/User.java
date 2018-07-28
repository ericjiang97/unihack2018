package edu.monash.spring.sso.web.core;

import org.springframework.security.core.GrantedAuthority;

import java.util.*;

public class User extends org.springframework.security.core.userdetails.User {

    protected Map<String, List<String>> attributes = new HashMap<>();

    public User(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public User(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    }

    public void setAttribute(String name, String value) {
        if (attributes.get(name) == null) {
            attributes.put(name, new LinkedList<>());
        }
        if (!attributes.get(name).contains(value)) {
            attributes.get(name).add(value);
        }
    }

    public Map<String, List<String>> getAttribute() {
        return this.attributes;
    }

}
