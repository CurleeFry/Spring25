const themeSelector = document.querySelector('#display_mode');

function changeTheme() {
    const mode = themeSelector.value;
    console.log(mode);

    const body = document.body;
    const byui_logo = document.querySelector("#byui_logo");

    if (mode === 'dark') {
        body.classList.add('dark');
        byui_logo.src = 'byui-logo_white.png';
    } else {
        body.classList.remove('dark');
        byui_logo.src = 'byui-logo_blue.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);