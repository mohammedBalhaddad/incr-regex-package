"use strict";

var _chai = require("chai");

var _regexpParser = require("../regexp-parser");

var _incrRegexV = require("../incr-regex-v3");

//import {describe} from "mocha";

describe("regexp tests", function () {
  var comp = ['^', 't', 'o', '\\(', '(', '[^1-5az]', '|', '[^\\]12]', ')', '\\d', ')', '$'];
  var compStr = comp.join('');

  describe("parser", function () {
    it("regexp  ab", function () {
      //
      var t = _regexpParser.RxParser.parse("ab");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("(a.(b.<DONE>))");
    });
    it("regexp  \\w{3,4}", function () {
      //
      var t = _regexpParser.RxParser.parse("\\w{3,4}");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("(\\w.(\\w.(\\w.((\\w?).<DONE>))))");
    });
    it("regexp  \\W{3,4}\\d{2,2}", function () {
      //
      var t = _regexpParser.RxParser.parse("\\W{3,4}\\d{2,2}");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("(\\W.(\\W.(\\W.((\\W?).(\\d.(\\d.<DONE>))))))");
    });
    it("regexp or a|b", function () {
      //
      var t = _regexpParser.RxParser.parse("a|b");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((a|b).<DONE>)");
      (0, _chai.expect)((0, _regexpParser.dot)(t)).to.be.true;
      (0, _chai.expect)((0, _regexpParser.or)(t.left)).to.be.true;
    });
    it("tokenizes x*", function () {
      //
      var t = _regexpParser.RxParser.parse("a*");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((a*).<DONE>)");
      (0, _chai.expect)((0, _regexpParser.dot)(t)).to.be.true;
      (0, _chai.expect)((0, _regexpParser.zero_or_more)(t.left)).to.be.true;
    });
    it("tokenizes /.\\ba*/", function () {
      //
      var t = _regexpParser.RxParser.parse(".\\ba*");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("(((.).(\\b.(a*))).<DONE>)");
      (0, _chai.expect)((0, _regexpParser.dot)(t)).to.be.true;
      //expect(zero_or_more(t.left)).to.be.true;
    });
  });
  describe("regex parser", function () {
    it("tokenizes abc", function () {
      //
      var t = _regexpParser.RxParser.parse("abc");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((a.(b.c)).<DONE>)");
      (0, _chai.expect)((0, _regexpParser.dot)(t)).to.be.true;
    });

    it("tokenizes (abc+)|b*|d", function () {
      //
      var t = _regexpParser.RxParser.parse("(abc+)|b*|d");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("(((a.(b.(c.(c*))))|((b*)|d)).<DONE>)");
      (0, _chai.expect)((0, _regexpParser.or)(t.left)).to.be.true;
      (0, _chai.expect)((0, _regexpParser.dot)(t.left.left)).to.be.true;
    });
    it("tokenizes x{0,}", function () {
      //
      var t = _regexpParser.RxParser.parse("x{0,}");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("((x*).<DONE>)");
    });
    it("tokenizes x{1,}", function () {
      //
      var t = _regexpParser.RxParser.parse("x{1,}");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((x.(x*)).<DONE>)");
      //expect(or(t.left)).to.be.true;
      //expect(dot(t.left.left)).to.be.true;
    });
    it("tokenizes x{3,}", function () {
      //
      var t = _regexpParser.RxParser.parse("x{3,}");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((((x.x).x).(x*)).<DONE>)");
      //expect(or(t.left)).to.be.true;
      //expect(dot(t.left.left)).to.be.true;
    });
  });

  describe("regex parserN", function () {
    it("tokenizes abc", function () {
      //
      var t = _regexpParser.RxParser.parse("abc");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("(a.(b.(c.<DONE>)))");
      (0, _chai.expect)((0, _regexpParser.dot)(t)).to.be.true;
    });

    it("tokenizes (abc+)|b*|d", function () {
      //
      var t = _regexpParser.RxParser.parse("(abc+)|b*|d");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("((a.(b.(c.((c*).<DONE>))))|(((b*).<DONE>)|(d.<DONE>)))");
      (0, _chai.expect)((0, _regexpParser.or)(t.left)).to.be.true;
      (0, _chai.expect)((0, _regexpParser.dot)(t.left.left)).to.be.true;
    });
    it("tokenizes x{0,}", function () {
      //
      var t = _regexpParser.RxParser.parse("x{0,}");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("((x*).<DONE>)");
    });
    it("tokenizes x{1,}", function () {
      //
      var t = _regexpParser.RxParser.parse("x{1,}");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("(x.((x*).<DONE>))");
      //expect(or(t.left)).to.be.true;
      //expect(dot(t.left.left)).to.be.true;
    });
    it("tokenizes x{3,}", function () {
      //
      var t = _regexpParser.RxParser.parse("x{3,}");
      (0, _chai.expect)((0, _regexpParser.printExprN)(t)).to.equal("(x.(x.(x.((x*).<DONE>))))");
    });
    it("tokenizes /|a|b/", function () {
      //
      var t = _regexpParser.RxParser.parse("|a|b");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((<DONE>|(a|b)).<DONE>)");
    });
    it("tokenizes /||a||b/", function () {
      //
      var t = _regexpParser.RxParser.parse("||a||b");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((<DONE>|(a|(<DONE>|b))).<DONE>)");
    });
    it("tokenizes /a|b|/", function () {
      //
      var t = _regexpParser.RxParser.parse("a|b|");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((a|(b|<DONE>)).<DONE>)");
    });
    it("tokenizes /a()b/", function () {
      //
      var t = _regexpParser.RxParser.parse("a()b");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((a.b).<DONE>)");
    });
    it("tokenizes /a()()+b/", function () {
      //
      var t = _regexpParser.RxParser.parse("a()b");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("((a.b).<DONE>)");
    });
    it("tokenizes /a()/", function () {
      //
      var t = _regexpParser.RxParser.parse("a()");
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("(a.<DONE>)");
    });
    it("tokenizes /a()/", function () {
      //
      var t = _regexpParser.RxParser.parse(/a()/);
      (0, _chai.expect)((0, _regexpParser.printExpr)(t)).to.equal("(a.<DONE>)");
    });
  });
}); /*
    Copyright (c) 2016, Nurul Choudhury
    
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    
    */