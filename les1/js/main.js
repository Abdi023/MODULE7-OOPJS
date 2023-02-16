class Cookie {
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;

    //Dit wordt 1x uitgevoerd wanneer "new" wordt gebruikt.
    constructor(newName, newHtmlElement, newScore) {
        this.name = newName;
        this.htmlElement = newHtmlElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }
    onCookieClicked = () => {
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange() {
        this.htmlElement.classList.add("cookie--chocolate");
    }

}


class Score {
    score;
    name = "";
    htmlElement = undefined;

    constructor(newScore, newName, newHtmlElement) {
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHtmlElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie) {
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;

    }

    substractScore() {
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked() {
        setInterval(() => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, 10000)
    }

    addPoints() {
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }

}


class Multiplair {
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplairClicked;
    }

    onMultiplairClicked = () => {
        if (this.bought === false) {
            // op het moment dat je multiplair klikt wordt er 100 punten van je score afgehaalt.
            //multiplair wordt aangezet op het cookie.
            //remove 100 point from score
            this.bought = true;
            this.cookie.score.substractScore();
            this.cookie.factor = this.factor;
        }
    }

}


class AutoScore {
    htmlElement = undefined;
    score = undefined;
    bought = false

    constructor(htmlElement, score) {
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;

    }

    onAutoScoreClicked = () => {
        if (this.bought === false) {
            this.bought = true;
            this.score.substractScore();
            this.score.onAutoScoreClicked();
        }
    }
}


class ChocolateCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }
    onChocolateCookieClicked = () => {
        if (this.bought === false) {
            this.bought = true;
            this.cookie.onStyleChange();
            this.cookie.score.addPoints();
        }

    }
}

/* setup for score and cookie */
const score = new Score(500, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);

/* setup desktop upgrades */
const multiplair = new Multiplair(document.getElementById("js--multiplair"), cookie);
const autoscore = new AutoScore(document.getElementById("js--autoscore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);

/* setup mobile upgrades */
const multiplairMobile = new Multiplair(document.getElementById("js--multiplair--mobile"), cookie);
const autoscoreMobile = new AutoScore(document.getElementById("js--autoscore-mobile"), score);
const chocolateMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"), cookie);





















