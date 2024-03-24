const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #888;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>NaoBuquet</h1>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Gracias por elegir NaoBuquet. Estás a solo un paso de completar tu proceso de verificación. Por favor, introduce el siguiente código en la aplicación:</p>
            <p class="code">{{codigo_de_verificacion}}</p>
            <p>Si no has solicitado un código de verificación, por favor ignora este correo.</p>
            <p>Saludos,</p>
            <p>El equipo de NaoBuquet</p>
        </div>
        <div class="footer">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
    </div>
</body>
</html>`;

export const buildTemplate = (otp: string) =>
  html.replace('{{codigo_de_verificacion}}', otp);
