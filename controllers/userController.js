const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const sendEmail = require('../utils/sendEmail');
const dotenv = require('dotenv');
const ApplicationInfo = require('../utils/dataApi');
dotenv.config();

const generatePassword = (length) => {
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};





function generateRandomPasswordE(length) {
  const charset = "0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}






exports.registerUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);



    const userExist = await User.findOne({ email, phone });
    if (userExist) {
      return res.status(451).json({ message: `${email} et ${phone}  est déja utilisé par autre compte` });
    }

    const user = new User(
      req.body);
    user.password = hashedPassword;

    await user.save();


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
    return res.status(201).json({ data: user, token, message: "User créé avec succès" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};




/// Auth user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: "Compte introuvable." });
    }

    // Vérification de l'état du compte
    if (user.status !== "Active") {
      return res.status(403).json({ message: "Votre compte est actuellement bloqué." });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '48h' } // Durée d'expiration du token
    );

    // Réponse de succès avec les données utilisateur et le token
    return res.status(200).json({
      message: "Connexion réussie.",
      data: user,
      token,
    });
  } catch (error) {
    // Gestion des erreurs du serveur
    console.error("Erreur lors de la connexion :", error.message);
    return res.status(500).json({ message: "Une erreur est survenue. Veuillez réessayer plus tard." });
  }
};




exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    delete updates.password;
    delete updates.access;

    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Cet utilisateur est introuvable" });
    }

    const result = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!result) {
      return res.status(404).json({ message: "Mise à jour échouée, utilisateur non trouvé" });
    }

    return res.status(200).json({ data: result, message: "Mise à jour réussie" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};





exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'User') {
      return res.status(404).json({ error: 'User non trouvé' });
    }
    user.status = user.status === 'Blocked' ? 'Active' : 'Blocked';
    await user.save();
    res.json({ data: user, message: `Utilisateur ${user.status.toLowerCase()}` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("codePostal").populate("category").populate("region");

    return res.status(200).json({ data: users.reverse(), message: "Tous les users" });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message });
  }
};



exports.getAllUsersByCity = async (req, res) => {
  try {
    const users = await User.find({ "city.value": req.params.idcity }).populate('userId');
    // console.log(users.reverse());
    return res.status(200).json({ data: users.reverse(), message: "Tous les users" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



exports.getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "COMPANY" || "INDIVIDUAL" }).populate('userId');
    return res.status(200).json({ data: clients, message: "Tous les clients" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).populate("codePostal").populate("category").populate("region");
    if (!user) {
      return res.status(404).send({ error: 'User non trouvé' });
    }
    return res.status(200).json({ data: user, message: "User récupéré avec succès" });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message });
  }
};






// update passwor user
// reste user
exports.updatePassworUser = async (req, res) => {
  try {
    const { password } = req.body;
    const idUser = req.params.id;
    const userExist = await User.findById({ _id: idUser });
    if (!userExist) {
      return res.status(450).json({ message: `Cet user n'esiste pas` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userExist.password = hashedPassword;

    /*sendEmail(
        `${ApplicationInfo.emailApplication}`,
      `${ApplicationInfo.passwordEmail}`,
        `${newUser.email}`,
        `${ApplicationInfo.name} Mise a jour de mot de passe`,
        `Votre mot viens d'etre mis à jour `
    );*/

    await userExist.save();

    return res.status(200).json({ data: userExist, message: "Mise a jour de votre mot de passe effectuer avec succès" });

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
}







// reset user
exports.resetPasswordUser = async (req, res) => {
  try {
    const { password, email, phone } = req.body;

    // Vérification des champs obligatoires
    if (!password && !email) {
      return res.status(400).json({ message: 'Mot de passe, email requis.' });
    }

    // Recherche dans User
    let userExist = await User.findOne({
      $or: [{ email }, { phone }]
    });

    // Si non trouvé dans User, recherche dans Customer
    if (!userExist) {
      userExist = await Customer.findOne({
        $or: [{ email }, { phone }]
      });
    }

    // Si aucun utilisateur trouvé
    if (!userExist) {
      return res.status(450).json({ message: `Aucun compte trouvé avec cet ${email}` });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mise à jour du mot de passe
    userExist.password = hashedPassword;

    // Sauvegarde de l'utilisateur mis à jour
    await userExist.save();

    // Réponse au client
    return res.status(200).json({
      message: "Mise à jour du mot de passe effectuée avec succès.",
      data: { email: userExist.email || userExist.phone }
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};







//send code user
exports.sendCodeResetUser = async (req, res) => {
  try {
    const { phone, email } = req.body;

    // Vérification des entrées
    if (!email) {
      return res.status(400).json({ message: 'Email  sont requis.' });
    }

    console.log('Email:', email,);

    // Recherche dans User et Customer
    const userExist = await User.findOne({ email: email });
    const customerExist = await Customer.findOne({ email: email });
    console.log(userExist, customerExist)

    // Si aucun compte n'existe
    if (!userExist && !customerExist) {

      return res.status(450).json({ message: `Aucun compte avec l'email ${email} n'a été trouvé.` });
    }

    // Si le compte existe dans l'un des deux modèles, priorité à User
    const targetUser = userExist || customerExist;

    // Génération du code de vérification
    const codeRandom = generateRandomPasswordE(4);
    targetUser.passwordverifield = codeRandom;
    // Sauvegarde du code de vérification
    await targetUser.save();

    // Construction de l'email
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mot de passe Plateforme User</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${ApplicationInfo.logoWebSite}" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
                <h2 style="color: #333;">Code de vérification envoyé par ${ApplicationInfo.name}</h2>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h3>Votre code de vérification est :</h3>
                <p style="font-size: 24px; font-weight: bold; color: #555;">${codeRandom}</p>
                <a href="${ApplicationInfo.urlwebSite}" target="_blank" style="display: inline-block; margin-top: 20px; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Accéder à l'application</a>
            </div>
            <p style="color: #666; margin-top: 20px;">Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail.</p>
            <p style="color: #666;">Cordialement,<br>L'équipe ${ApplicationInfo.name}</p>
        </div>
    </body>
    </html>
    `;

    // Envoi de l'email (supposant que vous avez une fonction pour cela)
    await sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, targetUser?.email, `Code de vérification `, htmlContent);

    return res.status(200).json({ message: 'Code de vérification envoyé avec succès.', code: codeRandom });
  } catch (error) {
    console.error('Erreur lors de la génération du code de vérification:', error);
    return res.status(500).json({ message: 'Code non envoyer sur cet mail.' });
  }
};





// Verify Code for User and Customer
exports.verifyCodeUser = async (req, res) => {
  try {
    const { phone, email, passwordverifield } = req.body;

    // Vérification des champs obligatoires
    if (!phone || !email) {
      return res.status(400).json({ message: 'Email requis.' });
    }
    if (!passwordverifield) {
      return res.status(400).json({ message: 'Le code de vérification est requis.' });
    }

    // Recherche dans User
    let userExist = await User.findOne({
      $or: [{ phone }, { email }]
    });

    // Recherche dans Customer si non trouvé dans User
    if (!userExist) {
      userExist = await Customer.findOne({
        $or: [{ phone }, { email }]
      });
    }

    // Si aucun utilisateur trouvé
    if (!userExist) {
      return res.status(450).json({ message: `Aucun utilisateur trouvé avec ces informations.` });
    }

    // Vérification du code de validation
    if (!userExist.passwordverifield || userExist.passwordverifield !== passwordverifield) {
      return res.status(451).json({ message: "Le code de vérification est incorrect ou n'existe pas." });
    }

    // Contenu HTML pour l'email
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérification du code</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${ApplicationInfo.logoWebSite}" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
                <h2 style="color: #333;">${ApplicationInfo.name} a approuvé le code de vérification</h2>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h3>Votre code de vérification est validé.</h3>
                <a href="${ApplicationInfo.urlwebSite}" target="_blank" style="display: inline-block; margin-top: 20px; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Accéder à l'application</a>
            </div>
            <p style="color: #666; margin-top: 20px;">Si vous n'avez pas demandé de vérification, veuillez ignorer cet e-mail.</p>
            <p style="color: #666;">Cordialement,<br>L'équipe ${ApplicationInfo.name}</p>
        </div>
    </body>
    </html>
    `;

    // Envoi de l'email
    sendEmail(
      `${ApplicationInfo.emailApplication}`,
      `${ApplicationInfo.passwordEmail}`,
      `${email}`,
      `${ApplicationInfo.name} a accepté votre code de vérification`,
      `${htmlContent}`
    );

    return res.status(200).json({ data: userExist, message: "Votre code de vérification a été validé avec succès." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Le code de vérification non validé" });
  }
};





// Block or unblock an user
exports.toggleUserStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.status = user.status === 'Active' ? 'Blocked' : 'Active';
    await user.save();
    var message = "";
    if (user.status === "Active") {
      message = `Compte de ${user.firstname} ${user.lastname} débloqué avec succès`;
    }
    else if (user.status === "Blocked") {
      message = `Compte de ${user.firstname} ${user.lastname} bloqué avec succès`;
    }
    return res.status(200).json({ data: user, message: message });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "L'operation à échoué" });
  }
};

