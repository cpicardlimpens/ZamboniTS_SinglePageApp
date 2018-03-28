# Zamboni Touch Street

*Zamboni Touch Street* has been conceived by Accademia di Belli Arti di Bologna (IT).

*Zamboni Touch Street* consists of a multimedia and interactive tour route divided into several stages along the way, proposed in the form of an online website.
The route is designed as a walk along *Via Zamboni* characterized by multi-sensory interaction with the street and its interest points presented through different types of content (audio, video, images, text, etc). These suggestions will guide the visitor to discover the many aspects of the way.

The development code for *Zamboni Touch Street* uses a single page application (without framework).

## Getting Started

The all structure consists in a backend wordpress *http://zambonits.limpica.net/wp/* with a REST API and a front-end the website *Zamboni TouchStreet*.

The Zamboni TouchStreet web-application is composed of:
- one page presentation: brief introduction, credits, access to the *Zamboni Touch Street*;
- one page map, with geolocation (google api) and pinned steps on the street;
- for each street’s step, a panoramic view showing interest points; a button info for an introduction to the street’s step;
- for each interest point, a pop up window with multimedia content (text, audio, images); all the content is extracted from the wordpress site and database access is made through REST API. (closing the pop up window is made by clicking outside the window)



<!--These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.--

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system
-->

## Built With

* [jQuery](http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js) - cross-platform JavaScript library for web
* [Bootstrap](bootstrap/dist/js/bootstrap.min.js) - front-end library for design
* [Handlebars](https://handlebarsjs.com/) - minimal templating
* [Mustache](https://github.com/janl/mustache.js/) - logic-less template syntax
* [imagesloaded](https://github.com/desandro/imagesloaded/blob/master/README.md) - to detect when images have been loaded


## Authors

* **Cécile Picard-Limpens** - *Initial work* - [ZamboniTouchStreet](https://github.com/cpicardlimpens/ZamboniTouchStreet)

See also the list of [contributors](https://github.com/cpicardlimpens/ZamboniTouchStreet/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* jquery.pano.js
