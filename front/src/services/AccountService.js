import NetworkService from './NetworkService'

const MOCK_USER_OBJECT = {
  id: '101887370903775434647',
  displayName: 'Eric Jiang',
  name: { familyName: 'Jiang', givenName: 'Eric' },
  photos: [
    {
      value:
        'https://lh3.googleusercontent.com/-InWMO98KR94/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7q54QVhLEN2rbuGQkylNVIGu1JApw/mo/photo.jpg?sz=50',
    },
  ],
  provider: 'google',
  _raw:
    '{\n "kind": "plus#person",\n "etag": "\\"hCnRu-GwRzXLXPdAHHyDrK_S150/Q5GJ0WelWHt_aWSK_7AzDOpQ20Q\\"",\n "objectType": "person",\n "id": "101887370903775434647",\n "displayName": "Eric Jiang",\n "name": {\n  "familyName": "Jiang",\n  "givenName": "Eric"\n },\n "url": "https://plus.google.com/101887370903775434647",\n "image": {\n  "url": "https://lh3.googleusercontent.com/-InWMO98KR94/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7q54QVhLEN2rbuGQkylNVIGu1JApw/mo/photo.jpg?sz=50",\n  "isDefault": true\n },\n "isPlusUser": true,\n "language": "en",\n "circledByCount": 1,\n "verified": false\n}\n',
  _json: {
    kind: 'plus#person',
    etag: '"hCnRu-GwRzXLXPdAHHyDrK_S150/Q5GJ0WelWHt_aWSK_7AzDOpQ20Q"',
    objectType: 'person',
    id: '101887370903775434647',
    displayName: 'Eric Jiang',
    name: { familyName: 'Jiang', givenName: 'Eric' },
    url: 'https://plus.google.com/101887370903775434647',
    image: {
      url:
        'https://lh3.googleusercontent.com/-InWMO98KR94/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7q54QVhLEN2rbuGQkylNVIGu1JApw/mo/photo.jpg?sz=50',
      isDefault: true,
    },
    isPlusUser: true,
    language: 'en',
    circledByCount: 1,
    verified: false,
  },
  accessToken:
    'ya29.GlsGBoBkVsIWnDjGN3dHkwGVGB1DCvoWDhAQ9benrclD04zTU2yCnCCKfGrGo6aCcIHXKpZhDyFnLlyUMptl_7yi-OX86FW3UAlJUZG9bBf1CtWC_zmZzyhGa9fa',
}

export default class AccountService {
  static getUser() {
    if (process.env.NODE_ENV === 'production') {
      const requestURI = `${window.location.origin}/api/profile`
      return NetworkService.get(requestURI, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
    }

    return Promise.resolve(MOCK_USER_OBJECT)
  }
}
