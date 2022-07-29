// TEMPORARY DATA

class Product {
  constructor(name, description, link = '', imgSrc = '') {
    this.name = name;
    this.description = description;
    this.link = link;
    this.imgSrc = imgSrc;
  }
}

class FeatureIcon {
  constructor(header, description, iconName) {
    this.header = header;
    this.description = description;
    this.iconName = iconName;
  }
}

class HomeProduct {
  constructor(title, description, routeName) {
    this.title = title;
    this.description = description;
    this.routeName = routeName;
  }
}

exports.products = [
  new Product(
    'Crop suggestion',
    'We help you to choose the best crops that you can grow for maximum yield hence maximum profit.'
  ),
  new Product(
    'Fertilizer suggestion',
    'Analysing the condition of your field, we suggest apt fertilizers that you can use for better growth of your crops.'
  ),
];

exports.featureIcons = [
  new FeatureIcon(
    'Easy to use',
    'The website is very easy to use. The complicated stuffs are all behind the scenes. Make the best decisions for the land with just few clicks!',
    'fa-check'
  ),
  new FeatureIcon(
    'Water friendly',
    'The system can save lots of water. The watering to the land can be controlled by the farmer after analyzing the nature of the land and decide which part of the land needs more water.',
    'fa-hand-holding-water'
  ),
  new FeatureIcon(
    'User friendly',
    'Understand all the technical features of the land in a visually  appealing way. Maximize your profit with our system by making better decisions.',
    'fa-heart'
  ),
];

exports.homeProducts = [
  new HomeProduct(
    'Crop Suggestion',
    '+ click here to find out the best crop to grow on your land.',
    '/user/$/products/crop-suggestion'
  ),
  new HomeProduct(
    'Fertilizer Suggestion',
    '+ click here to find out the fertilizer / manure required for your field.',
    '/user/$/products/fertilizer-suggestion'
  ),
];
// replacing $ with username

//
//
//
//
//

// welcome to smart agricare email

exports.welcomeSubject = 'Hey there! Welcome to Smart Agricare';
exports.welcomeContent = `
<h3>Welcome to Smart Agricare!</h3>

<p>
  You have just unlocked the newest of kind of experience at your finger
  tips. We provide various options for your agricultural needs.
</p>

<ul>
  <li>Precision Irrigation</li>
  <li>Crop Suggestion</li>
  <li>Fertilizer Suggestion</li>
</ul>
`;

// new login email

exports.newLoginSubject = 'New login identified';
exports.newLoginContent = `New login identified on `;

// password reset link email

exports.passwordResetSubject = `Here's your password reset link!`;
exports.passwordResetContent = `Click the link below to reset your password.`;

// password reset success email

exports.passwordResetSuccessSubject = `Password reset successful`;
exports.passwordResetSuccessContent = `Your password was successfully reset on `;
