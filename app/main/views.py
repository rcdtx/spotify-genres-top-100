from flask import render_template
from . import main
import os

@main.route('/', methods=['GET', 'POST'])
def index():
    cwd = os.path.dirname(os.path.abspath(__file__))
    genre_list_path = cwd + '/song_lists/genres.txt'
    genre_map = {}
    song_list = []
    song_map = {genre: "" for genre in genre_map}

    with open(genre_list_path, 'r') as f:
        genre_map = dict([line.split(',') for line in f])

    for genre in genre_map:
        song_list_path = cwd + '/song_lists/' + genre + '.txt'
        with open(song_list_path, 'rb') as f:
            song_list = f.readlines()
        song_list = [song.strip().decode('utf8').split('|') for song in song_list]
        song_map[genre] = song_list

    return render_template('index.html', genre_map=genre_map, song_map=song_map)
