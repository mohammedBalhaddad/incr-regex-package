/*
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
"use strict";

import {contract, n_head, n_tail, n_cons} from "./utils";
import {DONE,MORE,MAYBE,FAILED,matchable,dot,or,zero_or_one,zero_or_more, RxParser} from './regexp-parser';
import {incrRegEx, IREGEX, convertMask ,isMeta, isOptional,isHolder } from "./incr-regex-v3";
import {printExpr} from "./rxprint";
import {RXInputMask} from "./inputmask/RxInputMask";
import {RxMatcher} from "./RxMatcher";
if( incrRegEx === undefined) throw new Error("incrRegEx not defined");
if( RXInputMask === undefined) throw new Error("RXInputMask not defined");
if( RxMatcher === undefined) throw new Error("RxMatcher not defined");
/*export default {
	DONE,MORE,MAYBE,FAILED,incrRegEx,printExpr,RxParser,RXInputMask, contract, RxMatcher,
	matchable,dot,or,zero_or_one,zero_or_more, IREGEX, 
	convertMask ,isMeta, isOptional,isHolder 
};*/

export  {
  DONE,MORE,MAYBE,FAILED,incrRegEx,printExpr,RxParser,RXInputMask, contract, RxMatcher,
  matchable,dot,or,zero_or_one,zero_or_more, IREGEX, 
  convertMask ,isMeta, isOptional,isHolder 
};

/*
window.incrRegEx = {
  DONE,MORE,MAYBE,FAILED,incrRegEx,printExpr,RxParser,RXInputMask, contract, RxMatcher,
  matchable,dot,or,zero_or_one,zero_or_more, IREGEX, 
  convertMask ,isMeta, isOptional,isHolder 
};
*/
/*
const contract = {
  nat32,
  func, isFunc,
  typeOf, isTypeOf,
  arr, isArr,
  classOf, isClassOf,
  instanceOf, 
  isUndef
};


*/