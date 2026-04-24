fx_version 'cerulean'
game 'gta5'

author 'Harun155'
description 'HUD Resource'
version '1.0.0'

ui_page 'index.html'

files {
    'index.html',
    'global.css',
    'global.js',
    'images/*.png',
    'images/*.svg',
    'weapons/*.png'
}

client_scripts {
    'client.lua'
}


shared_scripts {
    'config.lua',
    'server/helpers/vite_temp.js'
}