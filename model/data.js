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

class Feature {
  constructor(title, subtitle, description) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
  }
}

exports.products = [
  new Product(
    'Precision Irrigation',
    'Ooooooo...! A very carefully curated design to irrigate your field with minimum human effort!'
  ),
  new Product(
    'Crop suggestion',
    "Guess what!? It's an intelligent system that can sugggest you with the type of crops that can be grown on your field to get the best out of your feild."
  ),
  new Product(
    'Fertilizer suggestion',
    "And again guess what!? It's an intelligent system that can suggest you with the type of fertilizers to be used on your field just so you know... to maximize your yield."
  ),
];

exports.featureIcons = [
  new FeatureIcon(
    'Easy to use',
    'The website is very easy to use.The complicated stuffs are all behind the scenes. Make the best decisions for the land with just few clicks!',
    'fa-check'
  ),
  new FeatureIcon(
    'Water friendly',
    'The system can save lots of water. The watering to the land can be controlled by the farmer after analyzing the nature of the land and decides which part of the land needs more water.',
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
    'Precision Irrigation',
    '+ click here to explore the automated irrigation system.',
    '/user/$/products/precision-irrigation',
  ),
  new HomeProduct(
    'Crop Suggestion',
    '+ click here to find out the best crop to grow on your land.',
    '/user/$/products/crop-suggestion',
  ),
  new HomeProduct(
    'Fertilizer Suggestion',
    '+ click here to find out the fertilizer / manure required for your field.',
    '/user/$/products/fertilizer-suggestion',
  ),
];
// replacing $ with username

exports.fsFeatures = [
  new Feature(
    'Pesticide Suggestion',
    'We got pesticide suggestion for you',
    'loream ipsum morec tiu huesdi irlim paren tickmae guik latam dij def gre guti'
  ),
  new Feature(
    'Growth enhancement fertilizers',
    'We got Growth enhancement fertilizer suggestions for you',
    'loream ipsum morec tiu huesdi irlim paren tickmae guik latam dij def gre guti'
  ),
  new Feature(
    'Topical solutions',
    'We got topical solutions for you',
    'loream ipsum morec tiu huesdi irlim paren tickmae guik latam dij def gre guti'
  ),
];

exports.csFeatures = [
  new Feature(
    'Based on Geographical Location',
    'Get crops based on geo-location',
    'loream ipsum morec tiu huesdi irlim paren tickmae guik latam dij def gre guti'
  ),
  new Feature(
    'Explore crops',
    'Explore crops bro!',
    'loream ipsum morec tiu huesdi irlim paren tickmae guik latam dij def gre guti'
  ),
  new Feature(
    'Based on Soil condition',
    'Get crops based on soil condition',
    'loream ipsum morec tiu huesdi irlim paren tickmae guik latam dij def gre guti'
  ),
];
