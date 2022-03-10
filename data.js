// TEMPORARY DATA

class Feature {
  constructor(featureName, description, link="", imgSrc = "") {
    this.featureName = featureName;
    this.description = description;
    this.link = link;
    this.imgSrc = imgSrc;
  }
}

exports.features = [
  new Feature(
    "Precision Irrigation",
    "Ooooooo...! A very carefully curated design to irrigate your field with minimum human effort!"
  ),
  new Feature(
    "Crop suggestion",
    "Guess what!? It's an intelligent system that can sugggest you with the type of crops that can be grown on your field to get the best out of your feild."
  ),
  new Feature(
    "Fertilizer suggestion",
    "And again guess what!? It's an intelligent system that can suggest you with the type of fertilizers to be used on your field just so you know... to maximize your yield."
  ),
];

class EaseIcon {
  constructor(header, description, iconName) {
    this.header = header;
    this.description = description;
    this.iconName = iconName;
  }
}

exports.icons = [
  new EaseIcon(
    "Easy to use",
    "The website is very easy to use.The complicated stuffs are all behind the scenes. Make the best decisions for the land with just few clicks!",
    "fa-check"
  ),
  new EaseIcon(
    "Water friendly",
    "The system can save lots of water. The watering to the land can be controlled by the farmer after analyzing the nature of the land and decides which part of the land needs more water.",
    "fa-hand-holding-water"
  ),
  new EaseIcon(
    "User friendly",
    "Understand all the technical features of the land in a visually  appealing way. Maximize your profit with our system by making better decisions.",
    "fa-heart"
  ),
];

class UserReview {
  constructor(userName, city, review, userImgSrc = "") {
    this.userName = userName;
    this.city = city;
    this.review = review;
    this.userImgSrc = userImgSrc;

    this.header = `${this.userName}, ${this.city}`;
  }

}

exports.userReviews = [
  new UserReview(
    "Gokul Balaji",
    "Mysuru",
    "Hi there! Gotta come up with some interesting text to add here!",
    "https://avatars.githubusercontent.com/u/81585814?v=4"
  ),
  new UserReview(
    "Prithviraj Vernekar",
    "Belgaum",
    "This is just some random user feedback after using our product.",
    "https://avatars.githubusercontent.com/u/67362607?v=4"
  ),
  new UserReview(
    "Harshini H J",
    "T Narsipura",
    "We can add this part later after we get some users.",
    "https://avatars.githubusercontent.com/u/63251164?v=4"
  ),
  new UserReview(
    "Koushik K P",
    "Chikmagaluru",
    "As of now, let it be here just to make it beautiful.",
    "https://avatars.githubusercontent.com/u/74169381?v=4"
  ),
];
