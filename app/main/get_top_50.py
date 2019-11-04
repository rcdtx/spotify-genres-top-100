import configparser
import os
import spotipy
import spotipy.oauth2 as oauth2

config = configparser.ConfigParser()
config.read('config.cfg')
client_id = config.get('SPOTIFY', 'CLIENT_ID')
client_secret = config.get('SPOTIFY', 'CLIENT_SECRET')

auth = oauth2.SpotifyClientCredentials(
    client_id=client_id,
    client_secret=client_secret
)

token = auth.get_access_token()

spotify = spotipy.Spotify(auth=token, client_credentials_manager=auth)
# for debug
#spotify.trace = True

genre_list = {'Alternative Rock' : '0aXgSLLFYRmT87Fit4lU35',
              'Ambient' : '1pbOkTqfvFgMMzKfCnTOgG',
              'Blues' : '5HUYim9Ao38y3lzJuuJy6a',
              'Classical' : '0yYCyUiJDnlU01jjLXxErd',
              'Country' : '4zZ87MUbSo1YyBj50AKQWv',
              'Dancehall' : '0d2lK8zr1wzwCudVNDvccw',
              'Deep House' : '7vD3EPo8uGyqJqqckZ3e6M',
              'Disco' : '70ZCTyQaVN8iwsuCuYX1F6',
              'Drum and Bass' : '5ALTYHhJzCasMIZuo0MqOq',
              'Dubstep' : '6TgD960XDPCLsBvZJIjq4i',
              'EDM' : '51V1kDRorMxXDHxmaImWCE',
              'Electronic' : '7qHoNdW8d4DCjnbDZVoOMn',
              'Folk' : '49B54TpeFQLFDpgl9eE8ry',
              'Rap' : '3mdw5yxk21OIDtq6nZS9jC',
              'House' : '5VC6LnsZoZEtUNjCQqEnKm',
              'Indie' : '5M3eIQcuAIWKbIwhoCnwew',
              'Jazz' : '7JEOVv3bn1sUnSuWEhVHVR',
              'Latin' : '6rdVDi8QGSVeidyVDeClPj',
              'Metal' : '3VxZpLk7y8GK65jJmep1ux',
              'Pop' : '3mQLQ5ZVpjixLv4P6h1RMn',
              'Rhythm and Blues' : '0CE9O4AdppRNfiQIsPAXkk',
              'Reggae' : '2iQc86tECGhSjmSx1zViIC',
              'Reggaeton' : '0SVoqDG5ReplwbaqROD1QS',
              'Rock' : '3GhEQkyQCTZOzzCOw8cNP5',
              'Soundtrack' : '5uKhl4UAg4EH8QxaToxDT7',
              'Techno' : '6kio0EUKcGw4dcc2h9XSH5',
              'Trance' : '4OB0bbEGXiKnXxZAo0eGUN',
              'Trap' : '6mxg4NxqkR8cr1o8hBPG5A'}

def get_genre_top_tracks(genre):
    results = spotify.search(genre, 50, 0, 'track', None)
    items = results['tracks']['items']
    top_50 = [(track['name'],track['artists'][0]['name'],track['popularity'],track['id']) for track in items]
    return (top_50)

def write_song_lists():
    for genre in genre_list:
        print(genre)
        cwd = os.getcwd()
        song_list_path = cwd + '/song_lists/' + genre + '.txt'
        with open(song_list_path, 'w', encoding='utf-8') as f:
            top_tracks = get_genre_top_tracks('genre: ' + '\"' + genre + '\"')
            f.write('\n'.join('{}| {}| {}| {}| {}'.format(index+1, x[0],x[1],x[2], x[3]) for index, x in enumerate(sorted(top_tracks, key=lambda x: x[2], reverse=True))))

def update_playlists():
    import spotipy.util as util
    scope = 'playlist-modify-public'
    username = 'bb1kqcn1c9uxssq5u9dphcaz1'
    uri = 'http://localhost/'
    token = util.prompt_for_user_token(username=username, scope=scope, client_id=client_id, client_secret=client_secret, redirect_uri=uri)

    spotify = spotipy.Spotify(auth=token)

    for genre in genre_list:
        print(genre)
        cwd = os.getcwd()
        song_list_path = cwd + '/song_lists/' + genre + '.txt'
        with open(song_list_path, 'r', encoding='utf-8') as f:
            track_id_list = [line.split('|')[4].strip() for line in f]
        spotify.user_playlist_replace_tracks(username, genre_list[genre], track_id_list)

if __name__ == "__main__":
    write_song_lists()
    update_playlists()
