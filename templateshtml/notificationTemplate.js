const ApplicationInfo = require("../utils/dataApi");

const htmlContentNotification = (subject, image, content) => {
    const htmlContent = `<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rappel de ${subject}</title>
    </head>
    <body style="width: 100%; font-family: Arial, sans-serif; background-color: #fff; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <div style="width: 90%; height: 550px; text-align: center; border: 1px solid #ccc; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); position: relative;">
            <header>
                <img src="${image}" alt="Logo de Resaplus" style="max-width: 300px; margin-bottom: 20px;">
            </header>
            <main>
                <h1 style="font-size: 1.2em; margin: 10px 0;">${content}</h1>
                <a href="${ApplicationInfo.urlwebSite}" style="display: inline-block; padding: 10px 20px; background-color: #009300; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">Resaplus</a>
            </main>
            <footer style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.8em;">
                <p>L'équipe de resaplus vous remercie</p>
                <p><a href="mailto:rezaplus2024@gmail.com" style="color:#009300;">rezaplus2024@gmail.com</a></p>
            </footer>
        </div>
    </body>
    </html>`;

    return htmlContent;
}

module.exports = { htmlContentNotification };
