"use strict";
var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var header = document.createElement('div');
            header.innerHTML = 'header';
            document.body.appendChild(header);
        }
        return Header;
    }());
    var Content = /** @class */ (function () {
        function Content() {
            var header = document.createElement('div');
            header.innerHTML = 'content';
            document.body.appendChild(header);
        }
        return Content;
    }());
    var Footer = /** @class */ (function () {
        function Footer() {
            var header = document.createElement('div');
            header.innerHTML = 'Footer';
            document.body.appendChild(header);
        }
        return Footer;
    }());
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Content();
            new Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
