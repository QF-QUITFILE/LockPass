-- NC PROTECT+
client_scripts { '@nc_PROTECT+/exports/cl.lua' }

fx_version 'cerulean'
game 'gta5'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/reset.css',
    'html/style.css',
    'html/script.js',
}

client_script 'client.lua'

exports {
    'startKeypad',
}