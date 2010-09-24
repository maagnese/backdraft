require.def("bd/test/matchers", [
  "dojo", "bd", "bd/test/namespace",
  "bd/lang"
], function(dojo, bd) {
///
// Defines the Backdraft test framework matcher functions.

bd.test.matchers= 
  ///namespace
  // Contains a set of matcher functions.
  bd.test.matchers || {};

var aDojoDeclaredObject= new (bd.declare(null, {}))();

dojo.mix(bd.test.matchers, {
  is: function(
    expected //(any) The expected object.
  ){
    ///
    // Tests that this.arg === expected.
    return((this.arg===expected ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
  },

  isNot: function(
    expected //(any) The expected object.
  ){
    ///
    // Tests that this.arg !== expected.
    return((this.arg!==expected ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
  },

  hasValue: function(
    expected //(any) The expected object.
  ){
    ///
    // Tests that this.arg is equal to expected by value.
    return((bd.equal(this.arg, expected) ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
  },

  hasDiffValue: function(
    expected //(any) The expected object.
  ){
    ///
    // Tests that this.arg is not equal to expected by value.
    return((!bd.equal(this.arg, expected) ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
  },

  isDojoDeclared: function() {
    ///
    // Tests that this.arg is an object created by a constructor generated by dojo.declare.
    return (this.arg.getInherited===aDojoDeclaredObject.getInherited ?  bd.test.result.pass : bd.test.result.fail)(this.arg);
  },

  //TODO: these need to be rewritten to say, e.g., the(x).isa(String) or the(x).nota(String)

  isString: function() {
    ///
    // Tests that this.arg is a string.
    return((dojo.isString(this.arg) ?  bd.test.result.pass : bd.test.result.fail)(this.arg));
  },

  isNotString: function() {
    ///
    // Tests that this.arg is not a string.
    return((!dojo.isString(this.arg) ?  bd.test.result.pass : bd.test.result.fail)(this.arg));
  },

  isArray: function() {
    ///
    // Tests that this.arg is a array.
    return((dojo.isArray(this.arg) ?  bd.test.result.pass : bd.test.result.fail)(this.arg));
  },

  isNotArray: function() {
    ///
    // Tests that this.arg is not an array.
    return((!dojo.isArray(this.arg) ?  bd.test.result.pass : bd.test.result.fail)(this.arg));
  },

  isFunction: function() {
    ///
    // Tests that this.arg is a function.
    return((dojo.isFunction(this.arg) ?  bd.test.result.pass : bd.test.result.fail)(this.arg));
  },

  isNotFunction: function() {
    ///
    // Tests that this.arg is not a function.
    return((!dojo.isFunction(this.arg) ?  bd.test.result.pass : bd.test.result.fail)(this.arg));
  },

  prototypeIs: function(
    expected //(object) The expected prototype.
  ){
    ///
    // Tests that the prototype of this.arg === expected.
    // `warn guaranteed to work iff browser supports __proto__ property
    // `warn changing the prototype of a constructor after that constructor has created objects will cause this test to return false fails
    // `warn this matcher won't work with objects created with delegation
    if (this.arg.__proto__) {
      return((this.arg.__proto__===(expected) ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
    } else {
      //see warning above...
      return((this.arg.constructor.prototype===(expected) ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
    }
  },

  prototypeIsNot: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that the prototype of this.arg !== expected.
    var result= bd.test.matchers.prototypeIs.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  isInstanceOf: function(
    expected //(object) The expected constructor function.
  ) {
    ///
    // Tests that this.arg is an instance of expected.
    return((this.arg instanceof expected ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
  },

  isNotInstanceOf: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that this.arg is not an instance of expected.
    var result= bd.test.matchers.isInstanceOf.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  hasProperties: function(
    expected //(array of string or object) The expected properties
  ){
    ///
    // Tests that this.arg contains at least properties given/contained by expected; properties may be anywhere in the prototype chain.
    if (dojo.isArray(expected)) {
      for (var i= 0, end= expected.length; i<end; i++) {
        if (!(expected[i] in this.arg)) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      return(bd.test.result.pass(this.arg, expected));
    } else {
      for (var p in expected) {
        if (!(p in this.arg)) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      return(bd.test.result.pass(this.arg, expected));
    }
  },

  doesNotHaveProperties: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that this.arg does not contain the properties given/contained by expected; properties may be anywhere in the prototype chain.
    var result= bd.test.matchers.hasProperties.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  hasOwnProperties: function(
    expected //(array of string or object) The expected properties.
  ){
    ///
    // Tests that this.arg contains at least its own properties given/contained by expected.
    if (dojo.isArray(expected)) {
      for (var i= 0, end= expected.length; i<end; i++) {
        if (!this.arg.hasOwnProperty(expected[i])) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
    } else {
      for (p in expected) {
        if (!this.arg.hasOwnProperty(p)){
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
    }
    return(bd.test.result.pass(this.arg, expected));
  },

  doesNotHaveOwnProperties: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that this.arg does not contain at least its own properties given/contained by expected.
    var result= bd.test.matchers.hasOwnProperties.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  hasPropertiesExact: function(
    expected //(array of string or object) The expected properties.
  ){
    ///
    // Tests that this.arg contains exactly properties given/contained by expected; properties may be anywhere in the prototype chain.
    if (dojo.isArray(expected)) {
      for (var i= 0, end= expected.length; i<end; i++) {
        if (!(expected[i] in this.arg)) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      var count= 0;
      for (var p in this.arg) {
        count++;
      }
      return((expected.length===count ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
    } else {
      for (var p in this.arg) {
        if (!(p in expected)) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      for (p in expected) {
        if (!(p in this.arg)) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      return(bd.test.result.pass(this.arg, expected));
    }
  },

  doesNotHaveExactProperties: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that this.arg does not contain exactly properties given/contained by expected; properties may be anywhere in the prototype chain.
    var result= bd.test.matchers.hasPropertiesExact.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  hasOwnPropertiesExact: function(
    expected //(array of string or object) The expected properties.
  ){
    ///
    // Tests that this.arg contains exactly its own properties given/contained by expected.
    if (dojo.isArray(expected)) {
      for (var i= 0, end= expected.length; i<end; i++) {
        if (!this.arg.hasOwnProperty(expected[i])) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      var count= 0;
      for (var p in this.arg) {
        if (this.arg.hasOwnProperty(p)) {
          count++;
        }
      }
      return((expected.length===count ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
    } else {
      for (var p in this.arg) {
        if (this.arg.hasOwnProperty(p)){
          if (!(p in expected)) {
            return(bd.test.result.fail(this.arg, expected));
            //return;
          }
        }
      }
      for (p in expected) {
        if (!this.arg.hasOwnProperty(p)) {
          return(bd.test.result.fail(this.arg, expected));
          //return;
        }
      }
      return(bd.test.result.pass(this.arg, expected));
    }
  },

  doesNotHaveOwnExactProperties: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that this.arg does not contain exactly its own properties given/contained by expected.
    var result= bd.test.matchers.hasOwnPropertiesExact.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  contains: function(
    expected //(regex or string) The expected string.
  ) {
    ///
    // Tests that this.arg contains expected.
    if (expected instanceof RegExp) {
      return((!!expected.exec(this.arg.toString()) ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
    } else {
      return((this.arg.toString().indexOf(expected)>-1 ? bd.test.result.pass : bd.test.result.fail)(this.arg, expected));
    }
  },

  doesNotContain: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that this.arg does not contain expected.
    var result= bd.test.matchers.contains.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  isEmpty: function(
  ) {
    ///
    // Tests that this.arg is either an empty array ([]) or an empty object ({}).

    if (dojo.isArray(this.arg)) {
      return this.arg.length ? bd.test.result.fail(this.arg) : bd.test.result.pass(this.arg);
    }
    for (var p in this.arg) {
      if (this.arg.hasOwnProperty(p)) {
        return(bd.test.result.fail(this.arg));
      }
    }
    return(bd.test.result.pass(this.arg));
  },

  isNotEmpty: function(
  ){
    ///
    // Tests that this.arg is neither an empty array ([]) or an empty object ({}).
    var result= bd.test.matchers.isEmpty.call(this);
    result.pass= !result.pass;
    return result;
  },

  inClosedInterval: function(
    min, //(number) The left endpoint.
    max //(number) The right endpoint.
  ) {
    ///
    // Tests that min <= this.arg <= max.
    return((min<=this.arg && this.arg<=max ? bd.test.result.pass : bd.test.result.fail)(this.arg, min, max));
  },

  notInClosedInterval: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that min > this.arg < max.
    var result= bd.test.matchers.inClosedInterval.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  inLeftOpenInterval: function(
    min, //(number) The left endpoint.
    max //(number) The right endpoint.
  ) {
    ///
    // Tests that min < this.arg <= max.
    return((min<this.arg && this.arg<=max ? bd.test.result.pass : bd.test.result.fail)(this.arg, min, max));
  },

  notInLeftOpenInterval: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that min >= this.arg > max.
    var result= bd.test.matchers.inLeftOpenInterval.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  inRightOpenInterval: function(
    min, //(number) The left endpoint.
    max //(number) The right endpoint.
  ) {
    ///
    // Tests that min <= this.arg < max.
    return((min<=this.arg && this.arg<max ? bd.test.result.pass : bd.test.result.fail)(this.arg, min, max));
  },

  notInRightOpenInterval: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that min > this.arg >= max.
    var result= bd.test.matchers.inRightOpenInterval.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  inOpenInterval: function(
    min, //(number) The left endpoint.
    max //(number) The right endpoint.
  ) {
    ///
    // Tests that min < this.arg < max.
    return((min<this.arg && this.arg<max ? bd.test.result.pass : bd.test.result.fail)(this.arg, min, max));
  },

  notInOpenInterval: function(
    expected //(name or object) The expected prototype.
  ){
    ///
    // Tests that min >= this.arg >= max.
    var result= bd.test.matchers.inOpenInterval.call(this, expected);
    result.pass= !result.pass;
    return result;
  },

  raises: function(
    expected
  ) {
    ///
    // Tests that expected() throws the exception expected.
    try {
      this.arg();
      return(bd.test.result.fail());
    } catch(e) {
      if (expected) {
        return((bd.equal(e, expected) ? bd.test.result.pass : bd.test.result.fail)(this.arg, e, expected));
      } else {
        return bd.test.result.pass(this.arg, e);
      }
    }
  }
});

dojo.mix(bd.test.matchers, {
  inRange: 
    ///
    //synonym for bd.test.matchers.inClosedInterval.
    bd.test.matchers.inClosedInterval,

  inLeftOpen: 
    ///
    //synonym for bd.test.matchers.inLeftOpenInterval.
    bd.test.matchers.inLeftOpenInterval,

  inRightOpen: 
    ///
    //synonym for bd.test.matchers.inRightOpenInterval.
    bd.test.matchers.inRightOpenInterval,

  inOpen: 
    ///
    //synonym for bd.test.matchers.inOpenInterval.
    bd.test.matchers.inOpenInterval

});

});
// Copyright (c) 2000-2009, Altoviso, Inc. (www.altoviso.com). Use, modification, and distribution subject to terms of license.

