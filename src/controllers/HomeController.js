class HomeController {

  index(req, res, next) {
    res.locals.title = 'Home';
    res.locals.description = 'Welcome to the home page';
    res.render('home/home');
  } 

}

module.exports = new HomeController();