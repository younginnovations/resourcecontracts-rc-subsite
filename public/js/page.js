/**
 * Super simple wysiwyg editor on Bootstrap v0.6.16
 * http://summernote.org/
 *
 * summernote.js
 * Copyright 2013-2015 Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license./
 *
 * Date: 2015-08-03T16:41Z
 */
(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals: jQuery
        factory(window.jQuery);
    }
}(function ($) {


    if (!Array.prototype.reduce) {
        /**
         * Array.prototype.reduce polyfill
         *
         * @param {Function} callback
         * @param {Value} [initialValue]
         * @return {Value}
         *
         * @see http://goo.gl/WNriQD
         */
        Array.prototype.reduce = function (callback) {
            var t = Object(this), len = t.length >>> 0, k = 0, value;
            if (arguments.length === 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }
                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        };
    }

    if ('function' !== typeof Array.prototype.filter) {
        /**
         * Array.prototype.filter polyfill
         *
         * @param {Function} func
         * @return {Array}
         *
         * @see http://goo.gl/T1KFnq
         */
        Array.prototype.filter = function (func) {
            var t = Object(this), len = t.length >>> 0;

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (func.call(thisArg, val, i, t)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }

    if (!Array.prototype.map) {
        /**
         * Array.prototype.map polyfill
         *
         * @param {Function} callback
         * @return {Array}
         *
         * @see https://goo.gl/SMWaMK
         */
        Array.prototype.map = function (callback, thisArg) {
            var T, A, k;
            if (this === null) {
                throw new TypeError(' this is null or not defined');
            }

            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            if (arguments.length > 1) {
                T = thisArg;
            }

            A = new Array(len);
            k = 0;

            while (k < len) {
                var kValue, mappedValue;
                if (k in O) {
                    kValue = O[k];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[k] = mappedValue;
                }
                k++;
            }
            return A;
        };
    }

    var isSupportAmd = typeof define === 'function' && define.amd;

    /**
     * returns whether font is installed or not.
     *
     * @param {String} fontName
     * @return {Boolean}
     */
    var isFontInstalled = function (fontName) {
        var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
        var $tester = $('<div>').css({
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            fontSize: '200px'
        }).text('mmmmmmmmmwwwwwww').appendTo(document.body);

        var originalWidth = $tester.css('fontFamily', testFontName).width();
        var width = $tester.css('fontFamily', fontName + ',' + testFontName).width();

        $tester.remove();

        return originalWidth !== width;
    };

    var userAgent = navigator.userAgent;
    var isMSIE = /MSIE|Trident/i.test(userAgent);
    var browserVersion;
    if (isMSIE) {
        var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
        if (matches) {
            browserVersion = parseFloat(matches[1]);
        }
        matches = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(userAgent);
        if (matches) {
            browserVersion = parseFloat(matches[1]);
        }
    }

    /**
     * @class core.agent
     *
     * Object which check platform and agent
     *
     * @singleton
     * @alternateClassName agent
     */
    var agent = {
        /** @property {Boolean} [isMac=false] true if this agent is Mac  */
        isMac: navigator.appVersion.indexOf('Mac') > -1,
        /** @property {Boolean} [isMSIE=false] true if this agent is a Internet Explorer  */
        isMSIE: isMSIE,
        /** @property {Boolean} [isFF=false] true if this agent is a Firefox  */
        isFF: /firefox/i.test(userAgent),
        isWebkit: /webkit/i.test(userAgent),
        /** @property {Boolean} [isSafari=false] true if this agent is a Safari  */
        isSafari: /safari/i.test(userAgent),
        /** @property {Float} browserVersion current browser version  */
        browserVersion: browserVersion,
        /** @property {String} jqueryVersion current jQuery version string  */
        jqueryVersion: parseFloat($.fn.jquery),
        isSupportAmd: isSupportAmd,
        hasCodeMirror: isSupportAmd ? require.specified('CodeMirror') : !!window.CodeMirror,
        isFontInstalled: isFontInstalled,
        isW3CRangeSupport: !!document.createRange
    };

    /**
     * @class core.func
     *
     * func utils (for high-order func's arg)
     *
     * @singleton
     * @alternateClassName func
     */
    var func = (function () {
        var eq = function (itemA) {
            return function (itemB) {
                return itemA === itemB;
            };
        };

        var eq2 = function (itemA, itemB) {
            return itemA === itemB;
        };

        var peq2 = function (propName) {
            return function (itemA, itemB) {
                return itemA[propName] === itemB[propName];
            };
        };

        var ok = function () {
            return true;
        };

        var fail = function () {
            return false;
        };

        var not = function (f) {
            return function () {
                return !f.apply(f, arguments);
            };
        };

        var and = function (fA, fB) {
            return function (item) {
                return fA(item) && fB(item);
            };
        };

        var self = function (a) {
            return a;
        };

        var idCounter = 0;

        /**
         * generate a globally-unique id
         *
         * @param {String} [prefix]
         */
        var uniqueId = function (prefix) {
            var id = ++idCounter + '';
            return prefix ? prefix + id : id;
        };

        /**
         * returns bnd (bounds) from rect
         *
         * - IE Compatability Issue: http://goo.gl/sRLOAo
         * - Scroll Issue: http://goo.gl/sNjUc
         *
         * @param {Rect} rect
         * @return {Object} bounds
         * @return {Number} bounds.top
         * @return {Number} bounds.left
         * @return {Number} bounds.width
         * @return {Number} bounds.height
         */
        var rect2bnd = function (rect) {
            var $document = $(document);
            return {
                top: rect.top + $document.scrollTop(),
                left: rect.left + $document.scrollLeft(),
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
            };
        };

        /**
         * returns a copy of the object where the keys have become the values and the values the keys.
         * @param {Object} obj
         * @return {Object}
         */
        var invertObject = function (obj) {
            var inverted = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    inverted[obj[key]] = key;
                }
            }
            return inverted;
        };

        /**
         * @param {String} namespace
         * @param {String} [prefix]
         * @return {String}
         */
        var namespaceToCamel = function (namespace, prefix) {
            prefix = prefix || '';
            return prefix + namespace.split('.').map(function (name) {
                    return name.substring(0, 1).toUpperCase() + name.substring(1);
                }).join('');
        };

        return {
            eq: eq,
            eq2: eq2,
            peq2: peq2,
            ok: ok,
            fail: fail,
            self: self,
            not: not,
            and: and,
            uniqueId: uniqueId,
            rect2bnd: rect2bnd,
            invertObject: invertObject,
            namespaceToCamel: namespaceToCamel
        };
    })();

    /**
     * @class core.list
     *
     * list utils
     *
     * @singleton
     * @alternateClassName list
     */
    var list = (function () {
        /**
         * returns the first item of an array.
         *
         * @param {Array} array
         */
        var head = function (array) {
            return array[0];
        };

        /**
         * returns the last item of an array.
         *
         * @param {Array} array
         */
        var last = function (array) {
            return array[array.length - 1];
        };

        /**
         * returns everything but the last entry of the array.
         *
         * @param {Array} array
         */
        var initial = function (array) {
            return array.slice(0, array.length - 1);
        };

        /**
         * returns the rest of the items in an array.
         *
         * @param {Array} array
         */
        var tail = function (array) {
            return array.slice(1);
        };

        /**
         * returns item of array
         */
        var find = function (array, pred) {
            for (var idx = 0, len = array.length; idx < len; idx++) {
                var item = array[idx];
                if (pred(item)) {
                    return item;
                }
            }
        };

        /**
         * returns true if all of the values in the array pass the predicate truth test.
         */
        var all = function (array, pred) {
            for (var idx = 0, len = array.length; idx < len; idx++) {
                if (!pred(array[idx])) {
                    return false;
                }
            }
            return true;
        };

        /**
         * returns index of item
         */
        var indexOf = function (array, item) {
            return $.inArray(item, array);
        };

        /**
         * returns true if the value is present in the list.
         */
        var contains = function (array, item) {
            return indexOf(array, item) !== -1;
        };

        /**
         * get sum from a list
         *
         * @param {Array} array - array
         * @param {Function} fn - iterator
         */
        var sum = function (array, fn) {
            fn = fn || func.self;
            return array.reduce(function (memo, v) {
                return memo + fn(v);
            }, 0);
        };

        /**
         * returns a copy of the collection with array type.
         * @param {Collection} collection - collection eg) node.childNodes, ...
         */
        var from = function (collection) {
            var result = [], idx = -1, length = collection.length;
            while (++idx < length) {
                result[idx] = collection[idx];
            }
            return result;
        };

        /**
         * cluster elements by predicate function.
         *
         * @param {Array} array - array
         * @param {Function} fn - predicate function for cluster rule
         * @param {Array[]}
         */
        var clusterBy = function (array, fn) {
            if (!array.length) {
                return [];
            }
            var aTail = tail(array);
            return aTail.reduce(function (memo, v) {
                var aLast = last(memo);
                if (fn(last(aLast), v)) {
                    aLast[aLast.length] = v;
                } else {
                    memo[memo.length] = [v];
                }
                return memo;
            }, [[head(array)]]);
        };

        /**
         * returns a copy of the array with all falsy values removed
         *
         * @param {Array} array - array
         * @param {Function} fn - predicate function for cluster rule
         */
        var compact = function (array) {
            var aResult = [];
            for (var idx = 0, len = array.length; idx < len; idx++) {
                if (array[idx]) {
                    aResult.push(array[idx]);
                }
            }
            return aResult;
        };

        /**
         * produces a duplicate-free version of the array
         *
         * @param {Array} array
         */
        var unique = function (array) {
            var results = [];

            for (var idx = 0, len = array.length; idx < len; idx++) {
                if (!contains(results, array[idx])) {
                    results.push(array[idx]);
                }
            }

            return results;
        };

        /**
         * returns next item.
         * @param {Array} array
         */
        var next = function (array, item) {
            var idx = indexOf(array, item);
            if (idx === -1) {
                return null;
            }

            return array[idx + 1];
        };

        /**
         * returns prev item.
         * @param {Array} array
         */
        var prev = function (array, item) {
            var idx = indexOf(array, item);
            if (idx === -1) {
                return null;
            }

            return array[idx - 1];
        };

        return {
            head: head, last: last, initial: initial, tail: tail,
            prev: prev, next: next, find: find, contains: contains,
            all: all, sum: sum, from: from,
            clusterBy: clusterBy, compact: compact, unique: unique
        };
    })();


    var NBSP_CHAR = String.fromCharCode(160);
    var ZERO_WIDTH_NBSP_CHAR = '\ufeff';

    /**
     * @class core.dom
     *
     * Dom functions
     *
     * @singleton
     * @alternateClassName dom
     */
    var dom = (function () {
        /**
         * @method isEditable
         *
         * returns whether node is `note-editable` or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */
        var isEditable = function (node) {
            return node && $(node).hasClass('note-editable');
        };

        /**
         * @method isControlSizing
         *
         * returns whether node is `note-control-sizing` or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */
        var isControlSizing = function (node) {
            return node && $(node).hasClass('note-control-sizing');
        };

        /**
         * @method  buildLayoutInfo
         *
         * build layoutInfo from $editor(.note-editor)
         *
         * @param {jQuery} $editor
         * @return {Object}
         * @return {Function} return.editor
         * @return {Node} return.dropzone
         * @return {Node} return.toolbar
         * @return {Node} return.editable
         * @return {Node} return.codable
         * @return {Node} return.popover
         * @return {Node} return.handle
         * @return {Node} return.dialog
         */
        var buildLayoutInfo = function ($editor) {
            var makeFinder;

            // air mode
            if ($editor.hasClass('note-air-editor')) {
                var id = list.last($editor.attr('id').split('-'));
                makeFinder = function (sIdPrefix) {
                    return function () {
                        return $(sIdPrefix + id);
                    };
                };

                return {
                    editor: function () {
                        return $editor;
                    },
                    holder: function () {
                        return $editor.data('holder');
                    },
                    editable: function () {
                        return $editor;
                    },
                    popover: makeFinder('#note-popover-'),
                    handle: makeFinder('#note-handle-'),
                    dialog: makeFinder('#note-dialog-')
                };

                // frame mode
            } else {
                makeFinder = function (className, $base) {
                    $base = $base || $editor;
                    return function () {
                        return $base.find(className);
                    };
                };

                var options = $editor.data('options');
                var $dialogHolder = (options && options.dialogsInBody) ? $(document.body) : null;

                return {
                    editor: function () {
                        return $editor;
                    },
                    holder: function () {
                        return $editor.data('holder');
                    },
                    dropzone: makeFinder('.note-dropzone'),
                    toolbar: makeFinder('.note-toolbar'),
                    editable: makeFinder('.note-editable'),
                    codable: makeFinder('.note-codable'),
                    statusbar: makeFinder('.note-statusbar'),
                    popover: makeFinder('.note-popover'),
                    handle: makeFinder('.note-handle'),
                    dialog: makeFinder('.note-dialog', $dialogHolder)
                };
            }
        };

        /**
         * returns makeLayoutInfo from editor's descendant node.
         *
         * @private
         * @param {Node} descendant
         * @return {Object}
         */
        var makeLayoutInfo = function (descendant) {
            var $target = $(descendant).closest('.note-editor, .note-air-editor, .note-air-layout');

            if (!$target.length) {
                return null;
            }

            var $editor;
            if ($target.is('.note-editor, .note-air-editor')) {
                $editor = $target;
            } else {
                $editor = $('#note-editor-' + list.last($target.attr('id').split('-')));
            }

            return buildLayoutInfo($editor);
        };

        /**
         * @method makePredByNodeName
         *
         * returns predicate which judge whether nodeName is same
         *
         * @param {String} nodeName
         * @return {Function}
         */
        var makePredByNodeName = function (nodeName) {
            nodeName = nodeName.toUpperCase();
            return function (node) {
                return node && node.nodeName.toUpperCase() === nodeName;
            };
        };

        /**
         * @method isText
         *
         *
         *
         * @param {Node} node
         * @return {Boolean} true if node's type is text(3)
         */
        var isText = function (node) {
            return node && node.nodeType === 3;
        };

        /**
         * ex) br, col, embed, hr, img, input, ...
         * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
         */
        var isVoid = function (node) {
            return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON/.test(node.nodeName.toUpperCase());
        };

        var isPara = function (node) {
            if (isEditable(node)) {
                return false;
            }

            // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
            return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
        };

        var isLi = makePredByNodeName('LI');

        var isPurePara = function (node) {
            return isPara(node) && !isLi(node);
        };

        var isTable = makePredByNodeName('TABLE');

        var isInline = function (node) {
            return !isBodyContainer(node) && !isList(node) && !isHr(node) && !isPara(node) && !isTable(node) && !isBlockquote(node);
        };

        var isList = function (node) {
            return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
        };

        var isHr = makePredByNodeName('HR');

        var isCell = function (node) {
            return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
        };

        var isBlockquote = makePredByNodeName('BLOCKQUOTE');

        var isBodyContainer = function (node) {
            return isCell(node) || isBlockquote(node) || isEditable(node);
        };

        var isAnchor = makePredByNodeName('A');

        var isParaInline = function (node) {
            return isInline(node) && !!ancestor(node, isPara);
        };

        var isBodyInline = function (node) {
            return isInline(node) && !ancestor(node, isPara);
        };

        var isBody = makePredByNodeName('BODY');

        /**
         * returns whether nodeB is closest sibling of nodeA
         *
         * @param {Node} nodeA
         * @param {Node} nodeB
         * @return {Boolean}
         */
        var isClosestSibling = function (nodeA, nodeB) {
            return nodeA.nextSibling === nodeB ||
                nodeA.previousSibling === nodeB;
        };

        /**
         * returns array of closest siblings with node
         *
         * @param {Node} node
         * @param {function} [pred] - predicate function
         * @return {Node[]}
         */
        var withClosestSiblings = function (node, pred) {
            pred = pred || func.ok;

            var siblings = [];
            if (node.previousSibling && pred(node.previousSibling)) {
                siblings.push(node.previousSibling);
            }
            siblings.push(node);
            if (node.nextSibling && pred(node.nextSibling)) {
                siblings.push(node.nextSibling);
            }
            return siblings;
        };

        /**
         * blank HTML for cursor position
         * - [workaround] old IE only works with &nbsp;
         * - [workaround] IE11 and other browser works with bogus br
         */
        var blankHTML = agent.isMSIE && agent.browserVersion < 11 ? '&nbsp;' : '<br>';

        /**
         * @method nodeLength
         *
         * returns #text's text size or element's childNodes size
         *
         * @param {Node} node
         */
        var nodeLength = function (node) {
            if (isText(node)) {
                return node.nodeValue.length;
            }

            return node.childNodes.length;
        };

        /**
         * returns whether node is empty or not.
         *
         * @param {Node} node
         * @return {Boolean}
         */
        var isEmpty = function (node) {
            var len = nodeLength(node);

            if (len === 0) {
                return true;
            } else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
                // ex) <p><br></p>, <span><br></span>
                return true;
            } else if (list.all(node.childNodes, isText) && node.innerHTML === '') {
                // ex) <p></p>, <span></span>
                return true;
            }

            return false;
        };

        /**
         * padding blankHTML if node is empty (for cursor position)
         */
        var paddingBlankHTML = function (node) {
            if (!isVoid(node) && !nodeLength(node)) {
                node.innerHTML = blankHTML;
            }
        };

        /**
         * find nearest ancestor predicate hit
         *
         * @param {Node} node
         * @param {Function} pred - predicate function
         */
        var ancestor = function (node, pred) {
            while (node) {
                if (pred(node)) {
                    return node;
                }
                if (isEditable(node)) {
                    break;
                }

                node = node.parentNode;
            }
            return null;
        };

        /**
         * find nearest ancestor only single child blood line and predicate hit
         *
         * @param {Node} node
         * @param {Function} pred - predicate function
         */
        var singleChildAncestor = function (node, pred) {
            node = node.parentNode;

            while (node) {
                if (nodeLength(node) !== 1) {
                    break;
                }
                if (pred(node)) {
                    return node;
                }
                if (isEditable(node)) {
                    break;
                }

                node = node.parentNode;
            }
            return null;
        };

        /**
         * returns new array of ancestor nodes (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [optional] pred - predicate function
         */
        var listAncestor = function (node, pred) {
            pred = pred || func.fail;

            var ancestors = [];
            ancestor(node, function (el) {
                if (!isEditable(el)) {
                    ancestors.push(el);
                }

                return pred(el);
            });
            return ancestors;
        };

        /**
         * find farthest ancestor predicate hit
         */
        var lastAncestor = function (node, pred) {
            var ancestors = listAncestor(node);
            return list.last(ancestors.filter(pred));
        };

        /**
         * returns common ancestor node between two nodes.
         *
         * @param {Node} nodeA
         * @param {Node} nodeB
         */
        var commonAncestor = function (nodeA, nodeB) {
            var ancestors = listAncestor(nodeA);
            for (var n = nodeB; n; n = n.parentNode) {
                if ($.inArray(n, ancestors) > -1) {
                    return n;
                }
            }
            return null; // difference document area
        };

        /**
         * listing all previous siblings (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [optional] pred - predicate function
         */
        var listPrev = function (node, pred) {
            pred = pred || func.fail;

            var nodes = [];
            while (node) {
                if (pred(node)) {
                    break;
                }
                nodes.push(node);
                node = node.previousSibling;
            }
            return nodes;
        };

        /**
         * listing next siblings (until predicate hit).
         *
         * @param {Node} node
         * @param {Function} [pred] - predicate function
         */
        var listNext = function (node, pred) {
            pred = pred || func.fail;

            var nodes = [];
            while (node) {
                if (pred(node)) {
                    break;
                }
                nodes.push(node);
                node = node.nextSibling;
            }
            return nodes;
        };

        /**
         * listing descendant nodes
         *
         * @param {Node} node
         * @param {Function} [pred] - predicate function
         */
        var listDescendant = function (node, pred) {
            var descendents = [];
            pred = pred || func.ok;

            // start DFS(depth first search) with node
            (function fnWalk(current) {
                if (node !== current && pred(current)) {
                    descendents.push(current);
                }
                for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
                    fnWalk(current.childNodes[idx]);
                }
            })(node);

            return descendents;
        };

        /**
         * wrap node with new tag.
         *
         * @param {Node} node
         * @param {Node} tagName of wrapper
         * @return {Node} - wrapper
         */
        var wrap = function (node, wrapperName) {
            var parent = node.parentNode;
            var wrapper = $('<' + wrapperName + '>')[0];

            parent.insertBefore(wrapper, node);
            wrapper.appendChild(node);

            return wrapper;
        };

        /**
         * insert node after preceding
         *
         * @param {Node} node
         * @param {Node} preceding - predicate function
         */
        var insertAfter = function (node, preceding) {
            var next = preceding.nextSibling, parent = preceding.parentNode;
            if (next) {
                parent.insertBefore(node, next);
            } else {
                parent.appendChild(node);
            }
            return node;
        };

        /**
         * append elements.
         *
         * @param {Node} node
         * @param {Collection} aChild
         */
        var appendChildNodes = function (node, aChild) {
            $.each(aChild, function (idx, child) {
                node.appendChild(child);
            });
            return node;
        };

        /**
         * returns whether boundaryPoint is left edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isLeftEdgePoint = function (point) {
            return point.offset === 0;
        };

        /**
         * returns whether boundaryPoint is right edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isRightEdgePoint = function (point) {
            return point.offset === nodeLength(point.node);
        };

        /**
         * returns whether boundaryPoint is edge or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isEdgePoint = function (point) {
            return isLeftEdgePoint(point) || isRightEdgePoint(point);
        };

        /**
         * returns wheter node is left edge of ancestor or not.
         *
         * @param {Node} node
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isLeftEdgeOf = function (node, ancestor) {
            while (node && node !== ancestor) {
                if (position(node) !== 0) {
                    return false;
                }
                node = node.parentNode;
            }

            return true;
        };

        /**
         * returns whether node is right edge of ancestor or not.
         *
         * @param {Node} node
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isRightEdgeOf = function (node, ancestor) {
            while (node && node !== ancestor) {
                if (position(node) !== nodeLength(node.parentNode) - 1) {
                    return false;
                }
                node = node.parentNode;
            }

            return true;
        };

        /**
         * returns whether point is left edge of ancestor or not.
         * @param {BoundaryPoint} point
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isLeftEdgePointOf = function (point, ancestor) {
            return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
        };

        /**
         * returns whether point is right edge of ancestor or not.
         * @param {BoundaryPoint} point
         * @param {Node} ancestor
         * @return {Boolean}
         */
        var isRightEdgePointOf = function (point, ancestor) {
            return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
        };

        /**
         * returns offset from parent.
         *
         * @param {Node} node
         */
        var position = function (node) {
            var offset = 0;
            while ((node = node.previousSibling)) {
                offset += 1;
            }
            return offset;
        };

        var hasChildren = function (node) {
            return !!(node && node.childNodes && node.childNodes.length);
        };

        /**
         * returns previous boundaryPoint
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */
        var prevPoint = function (point, isSkipInnerOffset) {
            var node, offset;

            if (point.offset === 0) {
                if (isEditable(point.node)) {
                    return null;
                }

                node = point.node.parentNode;
                offset = position(point.node);
            } else if (hasChildren(point.node)) {
                node = point.node.childNodes[point.offset - 1];
                offset = nodeLength(node);
            } else {
                node = point.node;
                offset = isSkipInnerOffset ? 0 : point.offset - 1;
            }

            return {
                node: node,
                offset: offset
            };
        };

        /**
         * returns next boundaryPoint
         *
         * @param {BoundaryPoint} point
         * @param {Boolean} isSkipInnerOffset
         * @return {BoundaryPoint}
         */
        var nextPoint = function (point, isSkipInnerOffset) {
            var node, offset;

            if (nodeLength(point.node) === point.offset) {
                if (isEditable(point.node)) {
                    return null;
                }

                node = point.node.parentNode;
                offset = position(point.node) + 1;
            } else if (hasChildren(point.node)) {
                node = point.node.childNodes[point.offset];
                offset = 0;
            } else {
                node = point.node;
                offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
            }

            return {
                node: node,
                offset: offset
            };
        };

        /**
         * returns whether pointA and pointB is same or not.
         *
         * @param {BoundaryPoint} pointA
         * @param {BoundaryPoint} pointB
         * @return {Boolean}
         */
        var isSamePoint = function (pointA, pointB) {
            return pointA.node === pointB.node && pointA.offset === pointB.offset;
        };

        /**
         * returns whether point is visible (can set cursor) or not.
         *
         * @param {BoundaryPoint} point
         * @return {Boolean}
         */
        var isVisiblePoint = function (point) {
            if (isText(point.node) || !hasChildren(point.node) || isEmpty(point.node)) {
                return true;
            }

            var leftNode = point.node.childNodes[point.offset - 1];
            var rightNode = point.node.childNodes[point.offset];
            if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
                return true;
            }

            return false;
        };

        /**
         * @method prevPointUtil
         *
         * @param {BoundaryPoint} point
         * @param {Function} pred
         * @return {BoundaryPoint}
         */
        var prevPointUntil = function (point, pred) {
            while (point) {
                if (pred(point)) {
                    return point;
                }

                point = prevPoint(point);
            }

            return null;
        };

        /**
         * @method nextPointUntil
         *
         * @param {BoundaryPoint} point
         * @param {Function} pred
         * @return {BoundaryPoint}
         */
        var nextPointUntil = function (point, pred) {
            while (point) {
                if (pred(point)) {
                    return point;
                }

                point = nextPoint(point);
            }

            return null;
        };

        /**
         * returns whether point has character or not.
         *
         * @param {Point} point
         * @return {Boolean}
         */
        var isCharPoint = function (point) {
            if (!isText(point.node)) {
                return false;
            }

            var ch = point.node.nodeValue.charAt(point.offset - 1);
            return ch && (ch !== ' ' && ch !== NBSP_CHAR);
        };

        /**
         * @method walkPoint
         *
         * @param {BoundaryPoint} startPoint
         * @param {BoundaryPoint} endPoint
         * @param {Function} handler
         * @param {Boolean} isSkipInnerOffset
         */
        var walkPoint = function (startPoint, endPoint, handler, isSkipInnerOffset) {
            var point = startPoint;

            while (point) {
                handler(point);

                if (isSamePoint(point, endPoint)) {
                    break;
                }

                var isSkipOffset = isSkipInnerOffset &&
                    startPoint.node !== point.node &&
                    endPoint.node !== point.node;
                point = nextPoint(point, isSkipOffset);
            }
        };

        /**
         * @method makeOffsetPath
         *
         * return offsetPath(array of offset) from ancestor
         *
         * @param {Node} ancestor - ancestor node
         * @param {Node} node
         */
        var makeOffsetPath = function (ancestor, node) {
            var ancestors = listAncestor(node, func.eq(ancestor));
            return ancestors.map(position).reverse();
        };

        /**
         * @method fromOffsetPath
         *
         * return element from offsetPath(array of offset)
         *
         * @param {Node} ancestor - ancestor node
         * @param {array} offsets - offsetPath
         */
        var fromOffsetPath = function (ancestor, offsets) {
            var current = ancestor;
            for (var i = 0, len = offsets.length; i < len; i++) {
                if (current.childNodes.length <= offsets[i]) {
                    current = current.childNodes[current.childNodes.length - 1];
                } else {
                    current = current.childNodes[offsets[i]];
                }
            }
            return current;
        };

        /**
         * @method splitNode
         *
         * split element or #text
         *
         * @param {BoundaryPoint} point
         * @param {Object} [options]
         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
         * @return {Node} right node of boundaryPoint
         */
        var splitNode = function (point, options) {
            var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
            var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;

            // edge case
            if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
                if (isLeftEdgePoint(point)) {
                    return point.node;
                } else if (isRightEdgePoint(point)) {
                    return point.node.nextSibling;
                }
            }

            // split #text
            if (isText(point.node)) {
                return point.node.splitText(point.offset);
            } else {
                var childNode = point.node.childNodes[point.offset];
                var clone = insertAfter(point.node.cloneNode(false), point.node);
                appendChildNodes(clone, listNext(childNode));

                if (!isSkipPaddingBlankHTML) {
                    paddingBlankHTML(point.node);
                    paddingBlankHTML(clone);
                }

                return clone;
            }
        };

        /**
         * @method splitTree
         *
         * split tree by point
         *
         * @param {Node} root - split root
         * @param {BoundaryPoint} point
         * @param {Object} [options]
         * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
         * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
         * @return {Node} right node of boundaryPoint
         */
        var splitTree = function (root, point, options) {
            // ex) [#text, <span>, <p>]
            var ancestors = listAncestor(point.node, func.eq(root));

            if (!ancestors.length) {
                return null;
            } else if (ancestors.length === 1) {
                return splitNode(point, options);
            }

            return ancestors.reduce(function (node, parent) {
                if (node === point.node) {
                    node = splitNode(point, options);
                }

                return splitNode({
                    node: parent,
                    offset: node ? dom.position(node) : nodeLength(parent)
                }, options);
            });
        };

        /**
         * split point
         *
         * @param {Point} point
         * @param {Boolean} isInline
         * @return {Object}
         */
        var splitPoint = function (point, isInline) {
            // find splitRoot, container
            //  - inline: splitRoot is a child of paragraph
            //  - block: splitRoot is a child of bodyContainer
            var pred = isInline ? isPara : isBodyContainer;
            var ancestors = listAncestor(point.node, pred);
            var topAncestor = list.last(ancestors) || point.node;

            var splitRoot, container;
            if (pred(topAncestor)) {
                splitRoot = ancestors[ancestors.length - 2];
                container = topAncestor;
            } else {
                splitRoot = topAncestor;
                container = splitRoot.parentNode;
            }

            // if splitRoot is exists, split with splitTree
            var pivot = splitRoot && splitTree(splitRoot, point, {
                    isSkipPaddingBlankHTML: isInline,
                    isNotSplitEdgePoint: isInline
                });

            // if container is point.node, find pivot with point.offset
            if (!pivot && container === point.node) {
                pivot = point.node.childNodes[point.offset];
            }

            return {
                rightNode: pivot,
                container: container
            };
        };

        var create = function (nodeName) {
            return document.createElement(nodeName);
        };

        var createText = function (text) {
            return document.createTextNode(text);
        };

        /**
         * @method remove
         *
         * remove node, (isRemoveChild: remove child or not)
         *
         * @param {Node} node
         * @param {Boolean} isRemoveChild
         */
        var remove = function (node, isRemoveChild) {
            if (!node || !node.parentNode) {
                return;
            }
            if (node.removeNode) {
                return node.removeNode(isRemoveChild);
            }

            var parent = node.parentNode;
            if (!isRemoveChild) {
                var nodes = [];
                var i, len;
                for (i = 0, len = node.childNodes.length; i < len; i++) {
                    nodes.push(node.childNodes[i]);
                }

                for (i = 0, len = nodes.length; i < len; i++) {
                    parent.insertBefore(nodes[i], node);
                }
            }

            parent.removeChild(node);
        };

        /**
         * @method removeWhile
         *
         * @param {Node} node
         * @param {Function} pred
         */
        var removeWhile = function (node, pred) {
            while (node) {
                if (isEditable(node) || !pred(node)) {
                    break;
                }

                var parent = node.parentNode;
                remove(node);
                node = parent;
            }
        };

        /**
         * @method replace
         *
         * replace node with provided nodeName
         *
         * @param {Node} node
         * @param {String} nodeName
         * @return {Node} - new node
         */
        var replace = function (node, nodeName) {
            if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
                return node;
            }

            var newNode = create(nodeName);

            if (node.style.cssText) {
                newNode.style.cssText = node.style.cssText;
            }

            appendChildNodes(newNode, list.from(node.childNodes));
            insertAfter(newNode, node);
            remove(node);

            return newNode;
        };

        var isTextarea = makePredByNodeName('TEXTAREA');

        /**
         * @param {jQuery} $node
         * @param {Boolean} [stripLinebreaks] - default: false
         */
        var value = function ($node, stripLinebreaks) {
            var val = isTextarea($node[0]) ? $node.val() : $node.html();
            if (stripLinebreaks) {
                return val.replace(/[\n\r]/g, '');
            }
            return val;
        };

        /**
         * @method html
         *
         * get the HTML contents of node
         *
         * @param {jQuery} $node
         * @param {Boolean} [isNewlineOnBlock]
         */
        var html = function ($node, isNewlineOnBlock) {
            var markup = value($node);

            if (isNewlineOnBlock) {
                var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
                markup = markup.replace(regexTag, function (match, endSlash, name) {
                    name = name.toUpperCase();
                    var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) && !!endSlash;
                    var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);

                    return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');
                });
                markup = $.trim(markup);
            }

            return markup;
        };

        return {
            /** @property {String} NBSP_CHAR */
            NBSP_CHAR: NBSP_CHAR,
            /** @property {String} ZERO_WIDTH_NBSP_CHAR */
            ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
            /** @property {String} blank */
            blank: blankHTML,
            /** @property {String} emptyPara */
            emptyPara: '<p>' + blankHTML + '</p>',
            makePredByNodeName: makePredByNodeName,
            isEditable: isEditable,
            isControlSizing: isControlSizing,
            buildLayoutInfo: buildLayoutInfo,
            makeLayoutInfo: makeLayoutInfo,
            isText: isText,
            isVoid: isVoid,
            isPara: isPara,
            isPurePara: isPurePara,
            isInline: isInline,
            isBlock: func.not(isInline),
            isBodyInline: isBodyInline,
            isBody: isBody,
            isParaInline: isParaInline,
            isList: isList,
            isTable: isTable,
            isCell: isCell,
            isBlockquote: isBlockquote,
            isBodyContainer: isBodyContainer,
            isAnchor: isAnchor,
            isDiv: makePredByNodeName('DIV'),
            isLi: isLi,
            isBR: makePredByNodeName('BR'),
            isSpan: makePredByNodeName('SPAN'),
            isB: makePredByNodeName('B'),
            isU: makePredByNodeName('U'),
            isS: makePredByNodeName('S'),
            isI: makePredByNodeName('I'),
            isImg: makePredByNodeName('IMG'),
            isTextarea: isTextarea,
            isEmpty: isEmpty,
            isEmptyAnchor: func.and(isAnchor, isEmpty),
            isClosestSibling: isClosestSibling,
            withClosestSiblings: withClosestSiblings,
            nodeLength: nodeLength,
            isLeftEdgePoint: isLeftEdgePoint,
            isRightEdgePoint: isRightEdgePoint,
            isEdgePoint: isEdgePoint,
            isLeftEdgeOf: isLeftEdgeOf,
            isRightEdgeOf: isRightEdgeOf,
            isLeftEdgePointOf: isLeftEdgePointOf,
            isRightEdgePointOf: isRightEdgePointOf,
            prevPoint: prevPoint,
            nextPoint: nextPoint,
            isSamePoint: isSamePoint,
            isVisiblePoint: isVisiblePoint,
            prevPointUntil: prevPointUntil,
            nextPointUntil: nextPointUntil,
            isCharPoint: isCharPoint,
            walkPoint: walkPoint,
            ancestor: ancestor,
            singleChildAncestor: singleChildAncestor,
            listAncestor: listAncestor,
            lastAncestor: lastAncestor,
            listNext: listNext,
            listPrev: listPrev,
            listDescendant: listDescendant,
            commonAncestor: commonAncestor,
            wrap: wrap,
            insertAfter: insertAfter,
            appendChildNodes: appendChildNodes,
            position: position,
            hasChildren: hasChildren,
            makeOffsetPath: makeOffsetPath,
            fromOffsetPath: fromOffsetPath,
            splitTree: splitTree,
            splitPoint: splitPoint,
            create: create,
            createText: createText,
            remove: remove,
            removeWhile: removeWhile,
            replace: replace,
            html: html,
            value: value
        };
    })();


    var range = (function () {

        /**
         * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
         *
         * @param {TextRange} textRange
         * @param {Boolean} isStart
         * @return {BoundaryPoint}
         *
         * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
         */
        var textRangeToPoint = function (textRange, isStart) {
            var container = textRange.parentElement(), offset;

            var tester = document.body.createTextRange(), prevContainer;
            var childNodes = list.from(container.childNodes);
            for (offset = 0; offset < childNodes.length; offset++) {
                if (dom.isText(childNodes[offset])) {
                    continue;
                }
                tester.moveToElementText(childNodes[offset]);
                if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
                    break;
                }
                prevContainer = childNodes[offset];
            }

            if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
                var textRangeStart = document.body.createTextRange(), curTextNode = null;
                textRangeStart.moveToElementText(prevContainer || container);
                textRangeStart.collapse(!prevContainer);
                curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;

                var pointTester = textRange.duplicate();
                pointTester.setEndPoint('StartToStart', textRangeStart);
                var textCount = pointTester.text.replace(/[\r\n]/g, '').length;

                while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
                    textCount -= curTextNode.nodeValue.length;
                    curTextNode = curTextNode.nextSibling;
                }

                /* jshint ignore:start */
                var dummy = curTextNode.nodeValue; // enforce IE to re-reference curTextNode, hack
                /* jshint ignore:end */

                if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&
                    textCount === curTextNode.nodeValue.length) {
                    textCount -= curTextNode.nodeValue.length;
                    curTextNode = curTextNode.nextSibling;
                }

                container = curTextNode;
                offset = textCount;
            }

            return {
                cont: container,
                offset: offset
            };
        };

        /**
         * return TextRange from boundary point (inspired by google closure-library)
         * @param {BoundaryPoint} point
         * @return {TextRange}
         */
        var pointToTextRange = function (point) {
            var textRangeInfo = function (container, offset) {
                var node, isCollapseToStart;

                if (dom.isText(container)) {
                    var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
                    var prevContainer = list.last(prevTextNodes).previousSibling;
                    node = prevContainer || container.parentNode;
                    offset += list.sum(list.tail(prevTextNodes), dom.nodeLength);
                    isCollapseToStart = !prevContainer;
                } else {
                    node = container.childNodes[offset] || container;
                    if (dom.isText(node)) {
                        return textRangeInfo(node, 0);
                    }

                    offset = 0;
                    isCollapseToStart = false;
                }

                return {
                    node: node,
                    collapseToStart: isCollapseToStart,
                    offset: offset
                };
            };

            var textRange = document.body.createTextRange();
            var info = textRangeInfo(point.node, point.offset);

            textRange.moveToElementText(info.node);
            textRange.collapse(info.collapseToStart);
            textRange.moveStart('character', info.offset);
            return textRange;
        };

        /**
         * Wrapped Range
         *
         * @constructor
         * @param {Node} sc - start container
         * @param {Number} so - start offset
         * @param {Node} ec - end container
         * @param {Number} eo - end offset
         */
        var WrappedRange = function (sc, so, ec, eo) {
            this.sc = sc;
            this.so = so;
            this.ec = ec;
            this.eo = eo;

            // nativeRange: get nativeRange from sc, so, ec, eo
            var nativeRange = function () {
                if (agent.isW3CRangeSupport) {
                    var w3cRange = document.createRange();
                    w3cRange.setStart(sc, so);
                    w3cRange.setEnd(ec, eo);

                    return w3cRange;
                } else {
                    var textRange = pointToTextRange({
                        node: sc,
                        offset: so
                    });

                    textRange.setEndPoint('EndToEnd', pointToTextRange({
                        node: ec,
                        offset: eo
                    }));

                    return textRange;
                }
            };

            this.getPoints = function () {
                return {
                    sc: sc,
                    so: so,
                    ec: ec,
                    eo: eo
                };
            };

            this.getStartPoint = function () {
                return {
                    node: sc,
                    offset: so
                };
            };

            this.getEndPoint = function () {
                return {
                    node: ec,
                    offset: eo
                };
            };

            /**
             * select update visible range
             */
            this.select = function () {
                var nativeRng = nativeRange();
                if (agent.isW3CRangeSupport) {
                    var selection = document.getSelection();
                    if (selection.rangeCount > 0) {
                        selection.removeAllRanges();
                    }
                    selection.addRange(nativeRng);
                } else {
                    nativeRng.select();
                }

                return this;
            };

            /**
             * @return {WrappedRange}
             */
            this.normalize = function () {

                /**
                 * @param {BoundaryPoint} point
                 * @param {Boolean} isLeftToRight
                 * @return {BoundaryPoint}
                 */
                var getVisiblePoint = function (point, isLeftToRight) {
                    if ((dom.isVisiblePoint(point) && !dom.isEdgePoint(point)) ||
                        (dom.isVisiblePoint(point) && dom.isRightEdgePoint(point) && !isLeftToRight) ||
                        (dom.isVisiblePoint(point) && dom.isLeftEdgePoint(point) && isLeftToRight) ||
                        (dom.isVisiblePoint(point) && dom.isBlock(point.node) && dom.isEmpty(point.node))) {
                        return point;
                    }

                    // point on block's edge
                    var block = dom.ancestor(point.node, dom.isBlock);
                    if (((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight) ||
                        ((dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight)) {

                        // returns point already on visible point
                        if (dom.isVisiblePoint(point)) {
                            return point;
                        }
                        // reverse direction 
                        isLeftToRight = !isLeftToRight;
                    }

                    var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint) :
                        dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
                    return nextPoint || point;
                };

                var endPoint = getVisiblePoint(this.getEndPoint(), false);
                var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);

                return new WrappedRange(
                    startPoint.node,
                    startPoint.offset,
                    endPoint.node,
                    endPoint.offset
                );
            };

            /**
             * returns matched nodes on range
             *
             * @param {Function} [pred] - predicate function
             * @param {Object} [options]
             * @param {Boolean} [options.includeAncestor]
             * @param {Boolean} [options.fullyContains]
             * @return {Node[]}
             */
            this.nodes = function (pred, options) {
                pred = pred || func.ok;

                var includeAncestor = options && options.includeAncestor;
                var fullyContains = options && options.fullyContains;

                // TODO compare points and sort
                var startPoint = this.getStartPoint();
                var endPoint = this.getEndPoint();

                var nodes = [];
                var leftEdgeNodes = [];

                dom.walkPoint(startPoint, endPoint, function (point) {
                    if (dom.isEditable(point.node)) {
                        return;
                    }

                    var node;
                    if (fullyContains) {
                        if (dom.isLeftEdgePoint(point)) {
                            leftEdgeNodes.push(point.node);
                        }
                        if (dom.isRightEdgePoint(point) && list.contains(leftEdgeNodes, point.node)) {
                            node = point.node;
                        }
                    } else if (includeAncestor) {
                        node = dom.ancestor(point.node, pred);
                    } else {
                        node = point.node;
                    }

                    if (node && pred(node)) {
                        nodes.push(node);
                    }
                }, true);

                return list.unique(nodes);
            };

            /**
             * returns commonAncestor of range
             * @return {Element} - commonAncestor
             */
            this.commonAncestor = function () {
                return dom.commonAncestor(sc, ec);
            };

            /**
             * returns expanded range by pred
             *
             * @param {Function} pred - predicate function
             * @return {WrappedRange}
             */
            this.expand = function (pred) {
                var startAncestor = dom.ancestor(sc, pred);
                var endAncestor = dom.ancestor(ec, pred);

                if (!startAncestor && !endAncestor) {
                    return new WrappedRange(sc, so, ec, eo);
                }

                var boundaryPoints = this.getPoints();

                if (startAncestor) {
                    boundaryPoints.sc = startAncestor;
                    boundaryPoints.so = 0;
                }

                if (endAncestor) {
                    boundaryPoints.ec = endAncestor;
                    boundaryPoints.eo = dom.nodeLength(endAncestor);
                }

                return new WrappedRange(
                    boundaryPoints.sc,
                    boundaryPoints.so,
                    boundaryPoints.ec,
                    boundaryPoints.eo
                );
            };

            /**
             * @param {Boolean} isCollapseToStart
             * @return {WrappedRange}
             */
            this.collapse = function (isCollapseToStart) {
                if (isCollapseToStart) {
                    return new WrappedRange(sc, so, sc, so);
                } else {
                    return new WrappedRange(ec, eo, ec, eo);
                }
            };

            /**
             * splitText on range
             */
            this.splitText = function () {
                var isSameContainer = sc === ec;
                var boundaryPoints = this.getPoints();

                if (dom.isText(ec) && !dom.isEdgePoint(this.getEndPoint())) {
                    ec.splitText(eo);
                }

                if (dom.isText(sc) && !dom.isEdgePoint(this.getStartPoint())) {
                    boundaryPoints.sc = sc.splitText(so);
                    boundaryPoints.so = 0;

                    if (isSameContainer) {
                        boundaryPoints.ec = boundaryPoints.sc;
                        boundaryPoints.eo = eo - so;
                    }
                }

                return new WrappedRange(
                    boundaryPoints.sc,
                    boundaryPoints.so,
                    boundaryPoints.ec,
                    boundaryPoints.eo
                );
            };

            /**
             * delete contents on range
             * @return {WrappedRange}
             */
            this.deleteContents = function () {
                if (this.isCollapsed()) {
                    return this;
                }

                var rng = this.splitText();
                var nodes = rng.nodes(null, {
                    fullyContains: true
                });

                // find new cursor point
                var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
                    return !list.contains(nodes, point.node);
                });

                var emptyParents = [];
                $.each(nodes, function (idx, node) {
                    // find empty parents
                    var parent = node.parentNode;
                    if (point.node !== parent && dom.nodeLength(parent) === 1) {
                        emptyParents.push(parent);
                    }
                    dom.remove(node, false);
                });

                // remove empty parents
                $.each(emptyParents, function (idx, node) {
                    dom.remove(node, false);
                });

                return new WrappedRange(
                    point.node,
                    point.offset,
                    point.node,
                    point.offset
                ).normalize();
            };

            /**
             * makeIsOn: return isOn(pred) function
             */
            var makeIsOn = function (pred) {
                return function () {
                    var ancestor = dom.ancestor(sc, pred);
                    return !!ancestor && (ancestor === dom.ancestor(ec, pred));
                };
            };

            // isOnEditable: judge whether range is on editable or not
            this.isOnEditable = makeIsOn(dom.isEditable);
            // isOnList: judge whether range is on list node or not
            this.isOnList = makeIsOn(dom.isList);
            // isOnAnchor: judge whether range is on anchor node or not
            this.isOnAnchor = makeIsOn(dom.isAnchor);
            // isOnAnchor: judge whether range is on cell node or not
            this.isOnCell = makeIsOn(dom.isCell);

            /**
             * @param {Function} pred
             * @return {Boolean}
             */
            this.isLeftEdgeOf = function (pred) {
                if (!dom.isLeftEdgePoint(this.getStartPoint())) {
                    return false;
                }

                var node = dom.ancestor(this.sc, pred);
                return node && dom.isLeftEdgeOf(this.sc, node);
            };

            /**
             * returns whether range was collapsed or not
             */
            this.isCollapsed = function () {
                return sc === ec && so === eo;
            };

            /**
             * wrap inline nodes which children of body with paragraph
             *
             * @return {WrappedRange}
             */
            this.wrapBodyInlineWithPara = function () {
                if (dom.isBodyContainer(sc) && dom.isEmpty(sc)) {
                    sc.innerHTML = dom.emptyPara;
                    return new WrappedRange(sc.firstChild, 0, sc.firstChild, 0);
                }

                /**
                 * [workaround] firefox often create range on not visible point. so normalize here.
                 *  - firefox: |<p>text</p>|
                 *  - chrome: <p>|text|</p>
                 */
                var rng = this.normalize();
                if (dom.isParaInline(sc) || dom.isPara(sc)) {
                    return rng;
                }

                // find inline top ancestor
                var topAncestor;
                if (dom.isInline(rng.sc)) {
                    var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
                    topAncestor = list.last(ancestors);
                    if (!dom.isInline(topAncestor)) {
                        topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
                    }
                } else {
                    topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
                }

                // siblings not in paragraph
                var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
                inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));

                // wrap with paragraph
                if (inlineSiblings.length) {
                    var para = dom.wrap(list.head(inlineSiblings), 'p');
                    dom.appendChildNodes(para, list.tail(inlineSiblings));
                }

                return this.normalize();
            };

            /**
             * insert node at current cursor
             *
             * @param {Node} node
             * @return {Node}
             */
            this.insertNode = function (node) {
                var rng = this.wrapBodyInlineWithPara().deleteContents();
                var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));

                if (info.rightNode) {
                    info.rightNode.parentNode.insertBefore(node, info.rightNode);
                } else {
                    info.container.appendChild(node);
                }

                return node;
            };

            /**
             * insert html at current cursor
             */
            this.pasteHTML = function (markup) {
                var contentsContainer = $('<div></div>').html(markup)[0];
                var childNodes = list.from(contentsContainer.childNodes);

                var rng = this.wrapBodyInlineWithPara().deleteContents();

                return childNodes.reverse().map(function (childNode) {
                    return rng.insertNode(childNode);
                }).reverse();
            };

            /**
             * returns text in range
             *
             * @return {String}
             */
            this.toString = function () {
                var nativeRng = nativeRange();
                return agent.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
            };

            /**
             * returns range for word before cursor
             *
             * @param {Boolean} [findAfter] - find after cursor, default: false
             * @return {WrappedRange}
             */
            this.getWordRange = function (findAfter) {
                var endPoint = this.getEndPoint();

                if (!dom.isCharPoint(endPoint)) {
                    return this;
                }

                var startPoint = dom.prevPointUntil(endPoint, function (point) {
                    return !dom.isCharPoint(point);
                });

                if (findAfter) {
                    endPoint = dom.nextPointUntil(endPoint, function (point) {
                        return !dom.isCharPoint(point);
                    });
                }

                return new WrappedRange(
                    startPoint.node,
                    startPoint.offset,
                    endPoint.node,
                    endPoint.offset
                );
            };

            /**
             * create offsetPath bookmark
             *
             * @param {Node} editable
             */
            this.bookmark = function (editable) {
                return {
                    s: {
                        path: dom.makeOffsetPath(editable, sc),
                        offset: so
                    },
                    e: {
                        path: dom.makeOffsetPath(editable, ec),
                        offset: eo
                    }
                };
            };

            /**
             * create offsetPath bookmark base on paragraph
             *
             * @param {Node[]} paras
             */
            this.paraBookmark = function (paras) {
                return {
                    s: {
                        path: list.tail(dom.makeOffsetPath(list.head(paras), sc)),
                        offset: so
                    },
                    e: {
                        path: list.tail(dom.makeOffsetPath(list.last(paras), ec)),
                        offset: eo
                    }
                };
            };

            /**
             * getClientRects
             * @return {Rect[]}
             */
            this.getClientRects = function () {
                var nativeRng = nativeRange();
                return nativeRng.getClientRects();
            };
        };

        /**
         * @class core.range
         *
         * Data structure
         *  * BoundaryPoint: a point of dom tree
         *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
         *
         * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
         *
         * @singleton
         * @alternateClassName range
         */
        return {
            /**
             * @method
             *
             * create Range Object From arguments or Browser Selection
             *
             * @param {Node} sc - start container
             * @param {Number} so - start offset
             * @param {Node} ec - end container
             * @param {Number} eo - end offset
             * @return {WrappedRange}
             */
            create: function (sc, so, ec, eo) {
                if (!arguments.length) { // from Browser Selection
                    if (agent.isW3CRangeSupport) {
                        var selection = document.getSelection();
                        if (!selection || selection.rangeCount === 0) {
                            return null;
                        } else if (dom.isBody(selection.anchorNode)) {
                            // Firefox: returns entire body as range on initialization. We won't never need it.
                            return null;
                        }

                        var nativeRng = selection.getRangeAt(0);
                        sc = nativeRng.startContainer;
                        so = nativeRng.startOffset;
                        ec = nativeRng.endContainer;
                        eo = nativeRng.endOffset;
                    } else { // IE8: TextRange
                        var textRange = document.selection.createRange();
                        var textRangeEnd = textRange.duplicate();
                        textRangeEnd.collapse(false);
                        var textRangeStart = textRange;
                        textRangeStart.collapse(true);

                        var startPoint = textRangeToPoint(textRangeStart, true),
                            endPoint = textRangeToPoint(textRangeEnd, false);

                        // same visible point case: range was collapsed.
                        if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&
                            dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&
                            endPoint.node.nextSibling === startPoint.node) {
                            startPoint = endPoint;
                        }

                        sc = startPoint.cont;
                        so = startPoint.offset;
                        ec = endPoint.cont;
                        eo = endPoint.offset;
                    }
                } else if (arguments.length === 2) { //collapsed
                    ec = sc;
                    eo = so;
                }
                return new WrappedRange(sc, so, ec, eo);
            },

            /**
             * @method
             *
             * create WrappedRange from node
             *
             * @param {Node} node
             * @return {WrappedRange}
             */
            createFromNode: function (node) {
                var sc = node;
                var so = 0;
                var ec = node;
                var eo = dom.nodeLength(ec);

                // browsers can't target a picture or void node
                if (dom.isVoid(sc)) {
                    so = dom.listPrev(sc).length - 1;
                    sc = sc.parentNode;
                }
                if (dom.isBR(ec)) {
                    eo = dom.listPrev(ec).length - 1;
                    ec = ec.parentNode;
                } else if (dom.isVoid(ec)) {
                    eo = dom.listPrev(ec).length;
                    ec = ec.parentNode;
                }

                return this.create(sc, so, ec, eo);
            },

            /**
             * create WrappedRange from node after position
             *
             * @param {Node} node
             * @return {WrappedRange}
             */
            createFromNodeBefore: function (node) {
                return this.createFromNode(node).collapse(true);
            },

            /**
             * create WrappedRange from node after position
             *
             * @param {Node} node
             * @return {WrappedRange}
             */
            createFromNodeAfter: function (node) {
                return this.createFromNode(node).collapse();
            },

            /**
             * @method
             *
             * create WrappedRange from bookmark
             *
             * @param {Node} editable
             * @param {Object} bookmark
             * @return {WrappedRange}
             */
            createFromBookmark: function (editable, bookmark) {
                var sc = dom.fromOffsetPath(editable, bookmark.s.path);
                var so = bookmark.s.offset;
                var ec = dom.fromOffsetPath(editable, bookmark.e.path);
                var eo = bookmark.e.offset;
                return new WrappedRange(sc, so, ec, eo);
            },

            /**
             * @method
             *
             * create WrappedRange from paraBookmark
             *
             * @param {Object} bookmark
             * @param {Node[]} paras
             * @return {WrappedRange}
             */
            createFromParaBookmark: function (bookmark, paras) {
                var so = bookmark.s.offset;
                var eo = bookmark.e.offset;
                var sc = dom.fromOffsetPath(list.head(paras), bookmark.s.path);
                var ec = dom.fromOffsetPath(list.last(paras), bookmark.e.path);

                return new WrappedRange(sc, so, ec, eo);
            }
        };
    })();

    /**
     * @class defaults
     *
     * @singleton
     */
    var defaults = {
        /** @property */
        version: '0.6.16',

        /**
         *
         * for event options, reference to EventHandler.attach
         *
         * @property {Object} options
         * @property {String/Number} [options.width=null] set editor width
         * @property {String/Number} [options.height=null] set editor height, ex) 300
         * @property {String/Number} options.minHeight set minimum height of editor
         * @property {String/Number} options.maxHeight
         * @property {String/Number} options.focus
         * @property {Number} options.tabsize
         * @property {Boolean} options.styleWithSpan
         * @property {Object} options.codemirror
         * @property {Object} [options.codemirror.mode='text/html']
         * @property {Object} [options.codemirror.htmlMode=true]
         * @property {Object} [options.codemirror.lineNumbers=true]
         * @property {String} [options.lang=en-US] language 'en-US', 'ko-KR', ...
         * @property {String} [options.direction=null] text direction, ex) 'rtl'
         * @property {Array} [options.toolbar]
         * @property {Boolean} [options.airMode=false]
         * @property {Array} [options.airPopover]
         * @property {Fucntion} [options.onInit] initialize
         * @property {Fucntion} [options.onsubmit]
         */
        options: {
            width: null,                  // set editor width
            height: null,                 // set editor height, ex) 300

            minHeight: null,              // set minimum height of editor
            maxHeight: null,              // set maximum height of editor

            focus: false,                 // set focus to editable area after initializing summernote

            tabsize: 4,                   // size of tab ex) 2 or 4
            styleWithSpan: true,          // style with span (Chrome and FF only)

            disableLinkTarget: false,     // hide link Target Checkbox
            disableDragAndDrop: false,    // disable drag and drop event
            disableResizeEditor: false,   // disable resizing editor
            disableResizeImage: false,    // disable resizing image

            shortcuts: true,              // enable keyboard shortcuts

            textareaAutoSync: true,       // enable textarea auto sync

            placeholder: false,           // enable placeholder text
            prettifyHtml: true,           // enable prettifying html while toggling codeview

            iconPrefix: 'fa fa-',         // prefix for css icon classes

            icons: {
                font: {
                    bold: 'bold',
                    italic: 'italic',
                    underline: 'underline',
                    clear: 'eraser',
                    height: 'text-height',
                    strikethrough: 'strikethrough',
                    superscript: 'superscript',
                    subscript: 'subscript'
                },
                image: {
                    image: 'picture-o',
                    floatLeft: 'align-left',
                    floatRight: 'align-right',
                    floatNone: 'align-justify',
                    shapeRounded: 'square',
                    shapeCircle: 'circle-o',
                    shapeThumbnail: 'picture-o',
                    shapeNone: 'times',
                    remove: 'trash-o'
                },
                link: {
                    link: 'link',
                    unlink: 'unlink',
                    edit: 'edit'
                },
                table: {
                    table: 'table'
                },
                hr: {
                    insert: 'minus'
                },
                style: {
                    style: 'magic'
                },
                lists: {
                    unordered: 'list-ul',
                    ordered: 'list-ol'
                },
                options: {
                    help: 'question',
                    fullscreen: 'arrows-alt',
                    codeview: 'code'
                },
                paragraph: {
                    paragraph: 'align-left',
                    outdent: 'outdent',
                    indent: 'indent',
                    left: 'align-left',
                    center: 'align-center',
                    right: 'align-right',
                    justify: 'align-justify'
                },
                color: {
                    recent: 'font'
                },
                history: {
                    undo: 'undo',
                    redo: 'repeat'
                },
                misc: {
                    check: 'check'
                }
            },

            dialogsInBody: false,          // false will add dialogs into editor

            codemirror: {                 // codemirror options
                mode: 'text/html',
                htmlMode: true,
                lineNumbers: true
            },

            // language
            lang: 'en-US',                // language 'en-US', 'ko-KR', ...
            direction: null,              // text direction, ex) 'rtl'

            // toolbar
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                // ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ],

            plugin: {},

            // air mode: inline editor
            airMode: false,
            // airPopover: [
            //   ['style', ['style']],
            //   ['font', ['bold', 'italic', 'underline', 'clear']],
            //   ['fontname', ['fontname']],
            //   ['color', ['color']],
            //   ['para', ['ul', 'ol', 'paragraph']],
            //   ['height', ['height']],
            //   ['table', ['table']],
            //   ['insert', ['link', 'picture']],
            //   ['help', ['help']]
            // ],
            airPopover: [
                ['color', ['color']],
                ['font', ['bold', 'underline', 'clear']],
                ['para', ['ul', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']]
            ],

            // style tag
            styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

            // default fontName
            defaultFontName: 'Helvetica Neue',

            // fontName
            fontNames: [
                'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
                'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
                'Tahoma', 'Times New Roman', 'Verdana'
            ],
            fontNamesIgnoreCheck: [],

            fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],

            // pallete colors(n x n)
            colors: [
                ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
                ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
                ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
                ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
                ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
                ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
                ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
                ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
            ],

            // lineHeight
            lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],

            // insertTable max size
            insertTableMaxSize: {
                col: 10,
                row: 10
            },

            // image
            maximumImageFileSize: null, // size in bytes, null = no limit

            // callbacks
            oninit: null,             // initialize
            onfocus: null,            // editable has focus
            onblur: null,             // editable out of focus
            onenter: null,            // enter key pressed
            onkeyup: null,            // keyup
            onkeydown: null,          // keydown
            onImageUpload: null,      // imageUpload
            onImageUploadError: null, // imageUploadError
            onMediaDelete: null,      // media delete
            onToolbarClick: null,
            onsubmit: null,

            /**
             * manipulate link address when user create link
             * @param {String} sLinkUrl
             * @return {String}
             */
            onCreateLink: function (sLinkUrl) {
                if (sLinkUrl.indexOf('@') !== -1 && sLinkUrl.indexOf(':') === -1) {
                    sLinkUrl = 'mailto:' + sLinkUrl;
                }

                return sLinkUrl;
            },

            keyMap: {
                pc: {
                    'ENTER': 'insertParagraph',
                    'CTRL+Z': 'undo',
                    'CTRL+Y': 'redo',
                    'TAB': 'tab',
                    'SHIFT+TAB': 'untab',
                    'CTRL+B': 'bold',
                    'CTRL+I': 'italic',
                    'CTRL+U': 'underline',
                    'CTRL+SHIFT+S': 'strikethrough',
                    'CTRL+BACKSLASH': 'removeFormat',
                    'CTRL+SHIFT+L': 'justifyLeft',
                    'CTRL+SHIFT+E': 'justifyCenter',
                    'CTRL+SHIFT+R': 'justifyRight',
                    'CTRL+SHIFT+J': 'justifyFull',
                    'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                    'CTRL+SHIFT+NUM8': 'insertOrderedList',
                    'CTRL+LEFTBRACKET': 'outdent',
                    'CTRL+RIGHTBRACKET': 'indent',
                    'CTRL+NUM0': 'formatPara',
                    'CTRL+NUM1': 'formatH1',
                    'CTRL+NUM2': 'formatH2',
                    'CTRL+NUM3': 'formatH3',
                    'CTRL+NUM4': 'formatH4',
                    'CTRL+NUM5': 'formatH5',
                    'CTRL+NUM6': 'formatH6',
                    'CTRL+ENTER': 'insertHorizontalRule',
                    'CTRL+K': 'showLinkDialog'
                },

                mac: {
                    'ENTER': 'insertParagraph',
                    'CMD+Z': 'undo',
                    'CMD+SHIFT+Z': 'redo',
                    'TAB': 'tab',
                    'SHIFT+TAB': 'untab',
                    'CMD+B': 'bold',
                    'CMD+I': 'italic',
                    'CMD+U': 'underline',
                    'CMD+SHIFT+S': 'strikethrough',
                    'CMD+BACKSLASH': 'removeFormat',
                    'CMD+SHIFT+L': 'justifyLeft',
                    'CMD+SHIFT+E': 'justifyCenter',
                    'CMD+SHIFT+R': 'justifyRight',
                    'CMD+SHIFT+J': 'justifyFull',
                    'CMD+SHIFT+NUM7': 'insertUnorderedList',
                    'CMD+SHIFT+NUM8': 'insertOrderedList',
                    'CMD+LEFTBRACKET': 'outdent',
                    'CMD+RIGHTBRACKET': 'indent',
                    'CMD+NUM0': 'formatPara',
                    'CMD+NUM1': 'formatH1',
                    'CMD+NUM2': 'formatH2',
                    'CMD+NUM3': 'formatH3',
                    'CMD+NUM4': 'formatH4',
                    'CMD+NUM5': 'formatH5',
                    'CMD+NUM6': 'formatH6',
                    'CMD+ENTER': 'insertHorizontalRule',
                    'CMD+K': 'showLinkDialog'
                }
            }
        },

        // default language: en-US
        lang: {
            'en-US': {
                font: {
                    bold: 'Bold',
                    italic: 'Italic',
                    underline: 'Underline',
                    clear: 'Remove Font Style',
                    height: 'Line Height',
                    name: 'Font Family',
                    strikethrough: 'Strikethrough',
                    subscript: 'Subscript',
                    superscript: 'Superscript',
                    size: 'Font Size'
                },
                image: {
                    image: 'Picture',
                    insert: 'Insert Image',
                    resizeFull: 'Resize Full',
                    resizeHalf: 'Resize Half',
                    resizeQuarter: 'Resize Quarter',
                    floatLeft: 'Float Left',
                    floatRight: 'Float Right',
                    floatNone: 'Float None',
                    shapeRounded: 'Shape: Rounded',
                    shapeCircle: 'Shape: Circle',
                    shapeThumbnail: 'Shape: Thumbnail',
                    shapeNone: 'Shape: None',
                    dragImageHere: 'Drag image or text here',
                    dropImage: 'Drop image or Text',
                    selectFromFiles: 'Select from files',
                    maximumFileSize: 'Maximum file size',
                    maximumFileSizeError: 'Maximum file size exceeded.',
                    url: 'Image URL',
                    remove: 'Remove Image'
                },
                link: {
                    link: 'Link',
                    insert: 'Insert Link',
                    unlink: 'Unlink',
                    edit: 'Edit',
                    textToDisplay: 'Text to display',
                    url: 'To what URL should this link go?',
                    openInNewWindow: 'Open in new window'
                },
                table: {
                    table: 'Table'
                },
                hr: {
                    insert: 'Insert Horizontal Rule'
                },
                style: {
                    style: 'Style',
                    normal: 'Normal',
                    blockquote: 'Quote',
                    pre: 'Code',
                    h1: 'Header 1',
                    h2: 'Header 2',
                    h3: 'Header 3',
                    h4: 'Header 4',
                    h5: 'Header 5',
                    h6: 'Header 6'
                },
                lists: {
                    unordered: 'Unordered list',
                    ordered: 'Ordered list'
                },
                options: {
                    help: 'Help',
                    fullscreen: 'Full Screen',
                    codeview: 'Code View'
                },
                paragraph: {
                    paragraph: 'Paragraph',
                    outdent: 'Outdent',
                    indent: 'Indent',
                    left: 'Align left',
                    center: 'Align center',
                    right: 'Align right',
                    justify: 'Justify full'
                },
                color: {
                    recent: 'Recent Color',
                    more: 'More Color',
                    background: 'Background Color',
                    foreground: 'Foreground Color',
                    transparent: 'Transparent',
                    setTransparent: 'Set transparent',
                    reset: 'Reset',
                    resetToDefault: 'Reset to default'
                },
                shortcut: {
                    shortcuts: 'Keyboard shortcuts',
                    close: 'Close',
                    textFormatting: 'Text formatting',
                    action: 'Action',
                    paragraphFormatting: 'Paragraph formatting',
                    documentStyle: 'Document Style',
                    extraKeys: 'Extra keys'
                },
                history: {
                    undo: 'Undo',
                    redo: 'Redo'
                }
            }
        }
    };

    /**
     * @class core.async
     *
     * Async functions which returns `Promise`
     *
     * @singleton
     * @alternateClassName async
     */
    var async = (function () {
        /**
         * @method readFileAsDataURL
         *
         * read contents of file as representing URL
         *
         * @param {File} file
         * @return {Promise} - then: sDataUrl
         */
        var readFileAsDataURL = function (file) {
            return $.Deferred(function (deferred) {
                $.extend(new FileReader(), {
                    onload: function (e) {
                        var sDataURL = e.target.result;
                        deferred.resolve(sDataURL);
                    },
                    onerror: function () {
                        deferred.reject(this);
                    }
                }).readAsDataURL(file);
            }).promise();
        };

        /**
         * @method createImage
         *
         * create `<image>` from url string
         *
         * @param {String} sUrl
         * @param {String} filename
         * @return {Promise} - then: $image
         */
        var createImage = function (sUrl, filename) {
            return $.Deferred(function (deferred) {
                var $img = $('<img>');

                $img.one('load', function () {
                    $img.off('error abort');
                    deferred.resolve($img);
                }).one('error abort', function () {
                    $img.off('load').detach();
                    deferred.reject($img);
                }).css({
                    display: 'none'
                }).appendTo(document.body).attr({
                    'src': sUrl,
                    'data-filename': filename
                });
            }).promise();
        };

        return {
            readFileAsDataURL: readFileAsDataURL,
            createImage: createImage
        };
    })();

    /**
     * @class core.key
     *
     * Object for keycodes.
     *
     * @singleton
     * @alternateClassName key
     */
    var key = (function () {
        var keyMap = {
            'BACKSPACE': 8,
            'TAB': 9,
            'ENTER': 13,
            'SPACE': 32,

            // Number: 0-9
            'NUM0': 48,
            'NUM1': 49,
            'NUM2': 50,
            'NUM3': 51,
            'NUM4': 52,
            'NUM5': 53,
            'NUM6': 54,
            'NUM7': 55,
            'NUM8': 56,

            // Alphabet: a-z
            'B': 66,
            'E': 69,
            'I': 73,
            'J': 74,
            'K': 75,
            'L': 76,
            'R': 82,
            'S': 83,
            'U': 85,
            'V': 86,
            'Y': 89,
            'Z': 90,

            'SLASH': 191,
            'LEFTBRACKET': 219,
            'BACKSLASH': 220,
            'RIGHTBRACKET': 221
        };

        return {
            /**
             * @method isEdit
             *
             * @param {Number} keyCode
             * @return {Boolean}
             */
            isEdit: function (keyCode) {
                return list.contains([8, 9, 13, 32], keyCode);
            },
            /**
             * @method isMove
             *
             * @param {Number} keyCode
             * @return {Boolean}
             */
            isMove: function (keyCode) {
                return list.contains([37, 38, 39, 40], keyCode);
            },
            /**
             * @property {Object} nameFromCode
             * @property {String} nameFromCode.8 "BACKSPACE"
             */
            nameFromCode: func.invertObject(keyMap),
            code: keyMap
        };
    })();

    /**
     * @class editing.History
     *
     * Editor History
     *
     */
    var History = function ($editable) {
        var stack = [], stackOffset = -1;
        var editable = $editable[0];

        var makeSnapshot = function () {
            var rng = range.create();
            var emptyBookmark = {s: {path: [], offset: 0}, e: {path: [], offset: 0}};

            return {
                contents: $editable.html(),
                bookmark: (rng ? rng.bookmark(editable) : emptyBookmark)
            };
        };

        var applySnapshot = function (snapshot) {
            if (snapshot.contents !== null) {
                $editable.html(snapshot.contents);
            }
            if (snapshot.bookmark !== null) {
                range.createFromBookmark(editable, snapshot.bookmark).select();
            }
        };

        /**
         * undo
         */
        this.undo = function () {
            // Create snap shot if not yet recorded
            if ($editable.html() !== stack[stackOffset].contents) {
                this.recordUndo();
            }

            if (0 < stackOffset) {
                stackOffset--;
                applySnapshot(stack[stackOffset]);
            }
        };

        /**
         * redo
         */
        this.redo = function () {
            if (stack.length - 1 > stackOffset) {
                stackOffset++;
                applySnapshot(stack[stackOffset]);
            }
        };

        /**
         * recorded undo
         */
        this.recordUndo = function () {
            stackOffset++;

            // Wash out stack after stackOffset
            if (stack.length > stackOffset) {
                stack = stack.slice(0, stackOffset);
            }

            // Create new snapshot and push it to the end
            stack.push(makeSnapshot());
        };

        // Create first undo stack
        this.recordUndo();
    };

    /**
     * @class editing.Style
     *
     * Style
     *
     */
    var Style = function () {
        /**
         * @method jQueryCSS
         *
         * [workaround] for old jQuery
         * passing an array of style properties to .css()
         * will result in an object of property-value pairs.
         * (compability with version < 1.9)
         *
         * @private
         * @param  {jQuery} $obj
         * @param  {Array} propertyNames - An array of one or more CSS properties.
         * @return {Object}
         */
        var jQueryCSS = function ($obj, propertyNames) {
            if (agent.jqueryVersion < 1.9) {
                var result = {};
                $.each(propertyNames, function (idx, propertyName) {
                    result[propertyName] = $obj.css(propertyName);
                });
                return result;
            }
            return $obj.css.call($obj, propertyNames);
        };

        /**
         * returns style object from node
         *
         * @param {jQuery} $node
         * @return {Object}
         */
        this.fromNode = function ($node) {
            var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
            var styleInfo = jQueryCSS($node, properties) || {};
            styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);
            return styleInfo;
        };

        /**
         * paragraph level style
         *
         * @param {WrappedRange} rng
         * @param {Object} styleInfo
         */
        this.stylePara = function (rng, styleInfo) {
            $.each(rng.nodes(dom.isPara, {
                includeAncestor: true
            }), function (idx, para) {
                $(para).css(styleInfo);
            });
        };

        /**
         * insert and returns styleNodes on range.
         *
         * @param {WrappedRange} rng
         * @param {Object} [options] - options for styleNodes
         * @param {String} [options.nodeName] - default: `SPAN`
         * @param {Boolean} [options.expandClosestSibling] - default: `false`
         * @param {Boolean} [options.onlyPartialContains] - default: `false`
         * @return {Node[]}
         */
        this.styleNodes = function (rng, options) {
            rng = rng.splitText();

            var nodeName = options && options.nodeName || 'SPAN';
            var expandClosestSibling = !!(options && options.expandClosestSibling);
            var onlyPartialContains = !!(options && options.onlyPartialContains);

            if (rng.isCollapsed()) {
                return [rng.insertNode(dom.create(nodeName))];
            }

            var pred = dom.makePredByNodeName(nodeName);
            var nodes = rng.nodes(dom.isText, {
                fullyContains: true
            }).map(function (text) {
                return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
            });

            if (expandClosestSibling) {
                if (onlyPartialContains) {
                    var nodesInRange = rng.nodes();
                    // compose with partial contains predication
                    pred = func.and(pred, function (node) {
                        return list.contains(nodesInRange, node);
                    });
                }

                return nodes.map(function (node) {
                    var siblings = dom.withClosestSiblings(node, pred);
                    var head = list.head(siblings);
                    var tails = list.tail(siblings);
                    $.each(tails, function (idx, elem) {
                        dom.appendChildNodes(head, elem.childNodes);
                        dom.remove(elem);
                    });
                    return list.head(siblings);
                });
            } else {
                return nodes;
            }
        };

        /**
         * get current style on cursor
         *
         * @param {WrappedRange} rng
         * @return {Object} - object contains style properties.
         */
        this.current = function (rng) {
            var $cont = $(dom.isText(rng.sc) ? rng.sc.parentNode : rng.sc);
            var styleInfo = this.fromNode($cont);

            // document.queryCommandState for toggle state
            styleInfo['font-bold'] = document.queryCommandState('bold') ? 'bold' : 'normal';
            styleInfo['font-italic'] = document.queryCommandState('italic') ? 'italic' : 'normal';
            styleInfo['font-underline'] = document.queryCommandState('underline') ? 'underline' : 'normal';
            styleInfo['font-strikethrough'] = document.queryCommandState('strikeThrough') ? 'strikethrough' : 'normal';
            styleInfo['font-superscript'] = document.queryCommandState('superscript') ? 'superscript' : 'normal';
            styleInfo['font-subscript'] = document.queryCommandState('subscript') ? 'subscript' : 'normal';

            // list-style-type to list-style(unordered, ordered)
            if (!rng.isOnList()) {
                styleInfo['list-style'] = 'none';
            } else {
                var aOrderedType = ['circle', 'disc', 'disc-leading-zero', 'square'];
                var isUnordered = $.inArray(styleInfo['list-style-type'], aOrderedType) > -1;
                styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
            }

            var para = dom.ancestor(rng.sc, dom.isPara);
            if (para && para.style['line-height']) {
                styleInfo['line-height'] = para.style.lineHeight;
            } else {
                var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
                styleInfo['line-height'] = lineHeight.toFixed(1);
            }

            styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
            styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
            styleInfo.range = rng;

            return styleInfo;
        };
    };


    /**
     * @class editing.Bullet
     *
     * @alternateClassName Bullet
     */
    var Bullet = function () {
        /**
         * @method insertOrderedList
         *
         * toggle ordered list
         *
         * @type command
         */
        this.insertOrderedList = function () {
            this.toggleList('OL');
        };

        /**
         * @method insertUnorderedList
         *
         * toggle unordered list
         *
         * @type command
         */
        this.insertUnorderedList = function () {
            this.toggleList('UL');
        };

        /**
         * @method indent
         *
         * indent
         *
         * @type command
         */
        this.indent = function () {
            var self = this;
            var rng = range.create().wrapBodyInlineWithPara();

            var paras = rng.nodes(dom.isPara, {includeAncestor: true});
            var clustereds = list.clusterBy(paras, func.peq2('parentNode'));

            $.each(clustereds, function (idx, paras) {
                var head = list.head(paras);
                if (dom.isLi(head)) {
                    self.wrapList(paras, head.parentNode.nodeName);
                } else {
                    $.each(paras, function (idx, para) {
                        $(para).css('marginLeft', function (idx, val) {
                            return (parseInt(val, 10) || 0) + 25;
                        });
                    });
                }
            });

            rng.select();
        };

        /**
         * @method outdent
         *
         * outdent
         *
         * @type command
         */
        this.outdent = function () {
            var self = this;
            var rng = range.create().wrapBodyInlineWithPara();

            var paras = rng.nodes(dom.isPara, {includeAncestor: true});
            var clustereds = list.clusterBy(paras, func.peq2('parentNode'));

            $.each(clustereds, function (idx, paras) {
                var head = list.head(paras);
                if (dom.isLi(head)) {
                    self.releaseList([paras]);
                } else {
                    $.each(paras, function (idx, para) {
                        $(para).css('marginLeft', function (idx, val) {
                            val = (parseInt(val, 10) || 0);
                            return val > 25 ? val - 25 : '';
                        });
                    });
                }
            });

            rng.select();
        };

        /**
         * @method toggleList
         *
         * toggle list
         *
         * @param {String} listName - OL or UL
         */
        this.toggleList = function (listName) {
            var self = this;
            var rng = range.create().wrapBodyInlineWithPara();

            var paras = rng.nodes(dom.isPara, {includeAncestor: true});
            var bookmark = rng.paraBookmark(paras);
            var clustereds = list.clusterBy(paras, func.peq2('parentNode'));

            // paragraph to list
            if (list.find(paras, dom.isPurePara)) {
                var wrappedParas = [];
                $.each(clustereds, function (idx, paras) {
                    wrappedParas = wrappedParas.concat(self.wrapList(paras, listName));
                });
                paras = wrappedParas;
                // list to paragraph or change list style
            } else {
                var diffLists = rng.nodes(dom.isList, {
                    includeAncestor: true
                }).filter(function (listNode) {
                    return !$.nodeName(listNode, listName);
                });

                if (diffLists.length) {
                    $.each(diffLists, function (idx, listNode) {
                        dom.replace(listNode, listName);
                    });
                } else {
                    paras = this.releaseList(clustereds, true);
                }
            }

            range.createFromParaBookmark(bookmark, paras).select();
        };

        /**
         * @method wrapList
         *
         * @param {Node[]} paras
         * @param {String} listName
         * @return {Node[]}
         */
        this.wrapList = function (paras, listName) {
            var head = list.head(paras);
            var last = list.last(paras);

            var prevList = dom.isList(head.previousSibling) && head.previousSibling;
            var nextList = dom.isList(last.nextSibling) && last.nextSibling;

            var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);

            // P to LI
            paras = paras.map(function (para) {
                return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
            });

            // append to list(<ul>, <ol>)
            dom.appendChildNodes(listNode, paras);

            if (nextList) {
                dom.appendChildNodes(listNode, list.from(nextList.childNodes));
                dom.remove(nextList);
            }

            return paras;
        };

        /**
         * @method releaseList
         *
         * @param {Array[]} clustereds
         * @param {Boolean} isEscapseToBody
         * @return {Node[]}
         */
        this.releaseList = function (clustereds, isEscapseToBody) {
            var releasedParas = [];

            $.each(clustereds, function (idx, paras) {
                var head = list.head(paras);
                var last = list.last(paras);

                var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) :
                    head.parentNode;
                var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                    node: last.parentNode,
                    offset: dom.position(last) + 1
                }, {
                    isSkipPaddingBlankHTML: true
                }) : null;

                var middleList = dom.splitTree(headList, {
                    node: head.parentNode,
                    offset: dom.position(head)
                }, {
                    isSkipPaddingBlankHTML: true
                });

                paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi) :
                    list.from(middleList.childNodes).filter(dom.isLi);

                // LI to P
                if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                    paras = paras.map(function (para) {
                        return dom.replace(para, 'P');
                    });
                }

                $.each(list.from(paras).reverse(), function (idx, para) {
                    dom.insertAfter(para, headList);
                });

                // remove empty lists
                var rootLists = list.compact([headList, middleList, lastList]);
                $.each(rootLists, function (idx, rootList) {
                    var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                    $.each(listNodes.reverse(), function (idx, listNode) {
                        if (!dom.nodeLength(listNode)) {
                            dom.remove(listNode, true);
                        }
                    });
                });

                releasedParas = releasedParas.concat(paras);
            });

            return releasedParas;
        };
    };


    /**
     * @class editing.Typing
     *
     * Typing
     *
     */
    var Typing = function () {

        // a Bullet instance to toggle lists off
        var bullet = new Bullet();

        /**
         * insert tab
         *
         * @param {jQuery} $editable
         * @param {WrappedRange} rng
         * @param {Number} tabsize
         */
        this.insertTab = function ($editable, rng, tabsize) {
            var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
            rng = rng.deleteContents();
            rng.insertNode(tab, true);

            rng = range.create(tab, tabsize);
            rng.select();
        };

        /**
         * insert paragraph
         */
        this.insertParagraph = function () {
            var rng = range.create();

            // deleteContents on range.
            rng = rng.deleteContents();

            // Wrap range if it needs to be wrapped by paragraph
            rng = rng.wrapBodyInlineWithPara();

            // finding paragraph
            var splitRoot = dom.ancestor(rng.sc, dom.isPara);

            var nextPara;
            // on paragraph: split paragraph
            if (splitRoot) {
                // if it is an empty line with li
                if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {
                    // disable UL/OL and escape!
                    bullet.toggleList(splitRoot.parentNode.nodeName);
                    return;
                    // if new line has content (not a line break)
                } else {
                    nextPara = dom.splitTree(splitRoot, rng.getStartPoint());

                    var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                    emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));

                    $.each(emptyAnchors, function (idx, anchor) {
                        dom.remove(anchor);
                    });
                }
                // no paragraph: insert empty paragraph
            } else {
                var next = rng.sc.childNodes[rng.so];
                nextPara = $(dom.emptyPara)[0];
                if (next) {
                    rng.sc.insertBefore(nextPara, next);
                } else {
                    rng.sc.appendChild(nextPara);
                }
            }

            range.create(nextPara, 0).normalize().select();

        };

    };

    /**
     * @class editing.Table
     *
     * Table
     *
     */
    var Table = function () {
        /**
         * handle tab key
         *
         * @param {WrappedRange} rng
         * @param {Boolean} isShift
         */
        this.tab = function (rng, isShift) {
            var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
            var table = dom.ancestor(cell, dom.isTable);
            var cells = dom.listDescendant(table, dom.isCell);

            var nextCell = list[isShift ? 'prev' : 'next'](cells, cell);
            if (nextCell) {
                range.create(nextCell, 0).select();
            }
        };

        /**
         * create empty table element
         *
         * @param {Number} rowCount
         * @param {Number} colCount
         * @return {Node}
         */
        this.createTable = function (colCount, rowCount) {
            var tds = [], tdHTML;
            for (var idxCol = 0; idxCol < colCount; idxCol++) {
                tds.push('<td>' + dom.blank + '</td>');
            }
            tdHTML = tds.join('');

            var trs = [], trHTML;
            for (var idxRow = 0; idxRow < rowCount; idxRow++) {
                trs.push('<tr>' + tdHTML + '</tr>');
            }
            trHTML = trs.join('');
            return $('<table class="table table-bordered">' + trHTML + '</table>')[0];
        };
    };


    var KEY_BOGUS = 'bogus';

    /**
     * @class editing.Editor
     *
     * Editor
     *
     */
    var Editor = function (handler) {

        var self = this;
        var style = new Style();
        var table = new Table();
        var typing = new Typing();
        var bullet = new Bullet();

        /**
         * @method createRange
         *
         * create range
         *
         * @param {jQuery} $editable
         * @return {WrappedRange}
         */
        this.createRange = function ($editable) {
            this.focus($editable);
            return range.create();
        };

        /**
         * @method saveRange
         *
         * save current range
         *
         * @param {jQuery} $editable
         * @param {Boolean} [thenCollapse=false]
         */
        this.saveRange = function ($editable, thenCollapse) {
            this.focus($editable);
            $editable.data('range', range.create());
            if (thenCollapse) {
                range.create().collapse().select();
            }
        };

        /**
         * @method saveRange
         *
         * save current node list to $editable.data('childNodes')
         *
         * @param {jQuery} $editable
         */
        this.saveNode = function ($editable) {
            // copy child node reference
            var copy = [];
            for (var key = 0, len = $editable[0].childNodes.length; key < len; key++) {
                copy.push($editable[0].childNodes[key]);
            }
            $editable.data('childNodes', copy);
        };

        /**
         * @method restoreRange
         *
         * restore lately range
         *
         * @param {jQuery} $editable
         */
        this.restoreRange = function ($editable) {
            var rng = $editable.data('range');
            if (rng) {
                rng.select();
                this.focus($editable);
            }
        };

        /**
         * @method restoreNode
         *
         * restore lately node list
         *
         * @param {jQuery} $editable
         */
        this.restoreNode = function ($editable) {
            $editable.html('');
            var child = $editable.data('childNodes');
            for (var index = 0, len = child.length; index < len; index++) {
                $editable[0].appendChild(child[index]);
            }
        };

        /**
         * @method currentStyle
         *
         * current style
         *
         * @param {Node} target
         * @return {Object|Boolean} unfocus
         */
        this.currentStyle = function (target) {
            var rng = range.create();
            var styleInfo = rng && rng.isOnEditable() ? style.current(rng.normalize()) : {};
            if (dom.isImg(target)) {
                styleInfo.image = target;
            }
            return styleInfo;
        };

        /**
         * style from node
         *
         * @param {jQuery} $node
         * @return {Object}
         */
        this.styleFromNode = function ($node) {
            return style.fromNode($node);
        };

        var triggerOnBeforeChange = function ($editable) {
            var $holder = dom.makeLayoutInfo($editable).holder();
            handler.bindCustomEvent(
                $holder, $editable.data('callbacks'), 'before.command'
            )($editable.html(), $editable);
        };

        var triggerOnChange = function ($editable) {
            var $holder = dom.makeLayoutInfo($editable).holder();
            handler.bindCustomEvent(
                $holder, $editable.data('callbacks'), 'change'
            )($editable.html(), $editable);
        };

        /**
         * @method undo
         * undo
         * @param {jQuery} $editable
         */
        this.undo = function ($editable) {
            triggerOnBeforeChange($editable);
            $editable.data('NoteHistory').undo();
            triggerOnChange($editable);
        };

        /**
         * @method redo
         * redo
         * @param {jQuery} $editable
         */
        this.redo = function ($editable) {
            triggerOnBeforeChange($editable);
            $editable.data('NoteHistory').redo();
            triggerOnChange($editable);
        };

        /**
         * @method beforeCommand
         * before command
         * @param {jQuery} $editable
         */
        var beforeCommand = this.beforeCommand = function ($editable) {
            triggerOnBeforeChange($editable);
            // keep focus on editable before command execution
            self.focus($editable);
        };

        /**
         * @method afterCommand
         * after command
         * @param {jQuery} $editable
         * @param {Boolean} isPreventTrigger
         */
        var afterCommand = this.afterCommand = function ($editable, isPreventTrigger) {
            $editable.data('NoteHistory').recordUndo();
            if (!isPreventTrigger) {
                triggerOnChange($editable);
            }
        };

        /**
         * @method bold
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method italic
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method underline
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method strikethrough
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method formatBlock
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method superscript
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method subscript
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method justifyLeft
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method justifyCenter
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method justifyRight
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method justifyFull
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method formatBlock
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method removeFormat
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method backColor
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method foreColor
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method insertHorizontalRule
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /**
         * @method fontName
         *
         * change font name
         *
         * @param {jQuery} $editable
         * @param {Mixed} value
         */

        /* jshint ignore:start */
        // native commands(with execCommand), generate function for execCommand
        var commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
            'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
            'formatBlock', 'removeFormat',
            'backColor', 'foreColor', 'fontName'];

        for (var idx = 0, len = commands.length; idx < len; idx++) {
            this[commands[idx]] = (function (sCmd) {
                return function ($editable, value) {
                    beforeCommand($editable);

                    document.execCommand(sCmd, false, value);

                    afterCommand($editable, true);
                };
            })(commands[idx]);
        }
        /* jshint ignore:end */

        /**
         * @method tab
         *
         * handle tab key
         *
         * @param {jQuery} $editable
         * @param {Object} options
         */
        this.tab = function ($editable, options) {
            var rng = this.createRange($editable);
            if (rng.isCollapsed() && rng.isOnCell()) {
                table.tab(rng);
            } else {
                beforeCommand($editable);
                typing.insertTab($editable, rng, options.tabsize);
                afterCommand($editable);
            }
        };

        /**
         * @method untab
         *
         * handle shift+tab key
         *
         */
        this.untab = function ($editable) {
            var rng = this.createRange($editable);
            if (rng.isCollapsed() && rng.isOnCell()) {
                table.tab(rng, true);
            }
        };

        /**
         * @method insertParagraph
         *
         * insert paragraph
         *
         * @param {Node} $editable
         */
        this.insertParagraph = function ($editable) {
            beforeCommand($editable);
            typing.insertParagraph($editable);
            afterCommand($editable);
        };

        /**
         * @method insertOrderedList
         *
         * @param {jQuery} $editable
         */
        this.insertOrderedList = function ($editable) {
            beforeCommand($editable);
            bullet.insertOrderedList($editable);
            afterCommand($editable);
        };

        /**
         * @param {jQuery} $editable
         */
        this.insertUnorderedList = function ($editable) {
            beforeCommand($editable);
            bullet.insertUnorderedList($editable);
            afterCommand($editable);
        };

        /**
         * @param {jQuery} $editable
         */
        this.indent = function ($editable) {
            beforeCommand($editable);
            bullet.indent($editable);
            afterCommand($editable);
        };

        /**
         * @param {jQuery} $editable
         */
        this.outdent = function ($editable) {
            beforeCommand($editable);
            bullet.outdent($editable);
            afterCommand($editable);
        };

        /**
         * insert image
         *
         * @param {jQuery} $editable
         * @param {String} sUrl
         */
        this.insertImage = function ($editable, sUrl, filename) {
            async.createImage(sUrl, filename).then(function ($image) {
                beforeCommand($editable);
                $image.css({
                    display: '',
                    width: Math.min($editable.width(), $image.width())
                });
                range.create().insertNode($image[0]);
                range.createFromNodeAfter($image[0]).select();
                afterCommand($editable);
            }).fail(function () {
                var $holder = dom.makeLayoutInfo($editable).holder();
                handler.bindCustomEvent(
                    $holder, $editable.data('callbacks'), 'image.upload.error'
                )();
            });
        };

        /**
         * @method insertNode
         * insert node
         * @param {Node} $editable
         * @param {Node} node
         */
        this.insertNode = function ($editable, node) {
            beforeCommand($editable);
            range.create().insertNode(node);
            range.createFromNodeAfter(node).select();
            afterCommand($editable);
        };

        /**
         * insert text
         * @param {Node} $editable
         * @param {String} text
         */
        this.insertText = function ($editable, text) {
            beforeCommand($editable);
            var textNode = range.create().insertNode(dom.createText(text));
            range.create(textNode, dom.nodeLength(textNode)).select();
            afterCommand($editable);
        };

        /**
         * paste HTML
         * @param {Node} $editable
         * @param {String} markup
         */
        this.pasteHTML = function ($editable, markup) {
            beforeCommand($editable);
            var contents = range.create().pasteHTML(markup);
            range.createFromNodeAfter(list.last(contents)).select();
            afterCommand($editable);
        };

        /**
         * formatBlock
         *
         * @param {jQuery} $editable
         * @param {String} tagName
         */
        this.formatBlock = function ($editable, tagName) {
            beforeCommand($editable);
            // [workaround] for MSIE, IE need `<`
            tagName = agent.isMSIE ? '<' + tagName + '>' : tagName;
            document.execCommand('FormatBlock', false, tagName);
            afterCommand($editable);
        };

        this.formatPara = function ($editable) {
            beforeCommand($editable);
            this.formatBlock($editable, 'P');
            afterCommand($editable);
        };

        /* jshint ignore:start */
        for (var idx = 1; idx <= 6; idx++) {
            this['formatH' + idx] = function (idx) {
                return function ($editable) {
                    this.formatBlock($editable, 'H' + idx);
                };
            }(idx);
        }
        ;
        /* jshint ignore:end */

        /**
         * fontSize
         *
         * @param {jQuery} $editable
         * @param {String} value - px
         */
        this.fontSize = function ($editable, value) {
            var rng = range.create();

            if (rng.isCollapsed()) {
                var spans = style.styleNodes(rng);
                var firstSpan = list.head(spans);

                $(spans).css({
                    'font-size': value + 'px'
                });

                // [workaround] added styled bogus span for style
                //  - also bogus character needed for cursor position
                if (firstSpan && !dom.nodeLength(firstSpan)) {
                    firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                    range.createFromNodeAfter(firstSpan.firstChild).select();
                    $editable.data(KEY_BOGUS, firstSpan);
                }
            } else {
                beforeCommand($editable);
                $(style.styleNodes(rng)).css({
                    'font-size': value + 'px'
                });
                afterCommand($editable);
            }
        };

        /**
         * insert horizontal rule
         * @param {jQuery} $editable
         */
        this.insertHorizontalRule = function ($editable) {
            beforeCommand($editable);

            var rng = range.create();
            var hrNode = rng.insertNode($('<HR/>')[0]);
            if (hrNode.nextSibling) {
                range.create(hrNode.nextSibling, 0).normalize().select();
            }

            afterCommand($editable);
        };

        /**
         * remove bogus node and character
         */
        this.removeBogus = function ($editable) {
            var bogusNode = $editable.data(KEY_BOGUS);
            if (!bogusNode) {
                return;
            }

            var textNode = list.find(list.from(bogusNode.childNodes), dom.isText);

            var bogusCharIdx = textNode.nodeValue.indexOf(dom.ZERO_WIDTH_NBSP_CHAR);
            if (bogusCharIdx !== -1) {
                textNode.deleteData(bogusCharIdx, 1);
            }

            if (dom.isEmpty(bogusNode)) {
                dom.remove(bogusNode);
            }

            $editable.removeData(KEY_BOGUS);
        };

        /**
         * lineHeight
         * @param {jQuery} $editable
         * @param {String} value
         */
        this.lineHeight = function ($editable, value) {
            beforeCommand($editable);
            style.stylePara(range.create(), {
                lineHeight: value
            });
            afterCommand($editable);
        };

        /**
         * unlink
         *
         * @type command
         *
         * @param {jQuery} $editable
         */
        this.unlink = function ($editable) {
            var rng = this.createRange($editable);
            if (rng.isOnAnchor()) {
                var anchor = dom.ancestor(rng.sc, dom.isAnchor);
                rng = range.createFromNode(anchor);
                rng.select();

                beforeCommand($editable);
                document.execCommand('unlink');
                afterCommand($editable);
            }
        };

        /**
         * create link (command)
         *
         * @param {jQuery} $editable
         * @param {Object} linkInfo
         * @param {Object} options
         */
        this.createLink = function ($editable, linkInfo, options) {
            var linkUrl = linkInfo.url;
            var linkText = linkInfo.text;
            var isNewWindow = linkInfo.isNewWindow;
            var rng = linkInfo.range || this.createRange($editable);
            var isTextChanged = rng.toString() !== linkText;

            options = options || dom.makeLayoutInfo($editable).editor().data('options');

            beforeCommand($editable);

            if (options.onCreateLink) {
                linkUrl = options.onCreateLink(linkUrl);
            }

            var anchors = [];
            if (isTextChanged) {
                // Create a new link when text changed.
                var anchor = rng.insertNode($('<A>' + linkText + '</A>')[0]);
                anchors.push(anchor);
            } else {
                anchors = style.styleNodes(rng, {
                    nodeName: 'A',
                    expandClosestSibling: true,
                    onlyPartialContains: true
                });
            }

            $.each(anchors, function (idx, anchor) {
                $(anchor).attr('href', linkUrl);
                if (isNewWindow) {
                    $(anchor).attr('target', '_blank');
                } else {
                    $(anchor).removeAttr('target');
                }
            });

            var startRange = range.createFromNodeBefore(list.head(anchors));
            var startPoint = startRange.getStartPoint();
            var endRange = range.createFromNodeAfter(list.last(anchors));
            var endPoint = endRange.getEndPoint();

            range.create(
                startPoint.node,
                startPoint.offset,
                endPoint.node,
                endPoint.offset
            ).select();

            afterCommand($editable);
        };

        /**
         * returns link info
         *
         * @return {Object}
         * @return {WrappedRange} return.range
         * @return {String} return.text
         * @return {Boolean} [return.isNewWindow=true]
         * @return {String} [return.url=""]
         */
        this.getLinkInfo = function ($editable) {
            this.focus($editable);

            var rng = range.create().expand(dom.isAnchor);

            // Get the first anchor on range(for edit).
            var $anchor = $(list.head(rng.nodes(dom.isAnchor)));

            return {
                range: rng,
                text: rng.toString(),
                isNewWindow: $anchor.length ? $anchor.attr('target') === '_blank' : false,
                url: $anchor.length ? $anchor.attr('href') : ''
            };
        };

        /**
         * setting color
         *
         * @param {Node} $editable
         * @param {Object} sObjColor  color code
         * @param {String} sObjColor.foreColor foreground color
         * @param {String} sObjColor.backColor background color
         */
        this.color = function ($editable, sObjColor) {
            var oColor = JSON.parse(sObjColor);
            var foreColor = oColor.foreColor, backColor = oColor.backColor;

            beforeCommand($editable);

            if (foreColor) {
                document.execCommand('foreColor', false, foreColor);
            }
            if (backColor) {
                document.execCommand('backColor', false, backColor);
            }

            afterCommand($editable);
        };

        /**
         * insert Table
         *
         * @param {Node} $editable
         * @param {String} sDim dimension of table (ex : "5x5")
         */
        this.insertTable = function ($editable, sDim) {
            var dimension = sDim.split('x');
            beforeCommand($editable);

            var rng = range.create().deleteContents();
            rng.insertNode(table.createTable(dimension[0], dimension[1]));
            afterCommand($editable);
        };

        /**
         * float me
         *
         * @param {jQuery} $editable
         * @param {String} value
         * @param {jQuery} $target
         */
        this.floatMe = function ($editable, value, $target) {
            beforeCommand($editable);
            // bootstrap
            $target.removeClass('pull-left pull-right');
            if (value && value !== 'none') {
                $target.addClass('pull-' + value);
            }

            // fallback for non-bootstrap
            $target.css('float', value);
            afterCommand($editable);
        };

        /**
         * change image shape
         *
         * @param {jQuery} $editable
         * @param {String} value css class
         * @param {Node} $target
         */
        this.imageShape = function ($editable, value, $target) {
            beforeCommand($editable);

            $target.removeClass('img-rounded img-circle img-thumbnail');

            if (value) {
                $target.addClass(value);
            }

            afterCommand($editable);
        };

        /**
         * resize overlay element
         * @param {jQuery} $editable
         * @param {String} value
         * @param {jQuery} $target - target element
         */
        this.resize = function ($editable, value, $target) {
            beforeCommand($editable);

            $target.css({
                width: value * 100 + '%',
                height: ''
            });

            afterCommand($editable);
        };

        /**
         * @param {Position} pos
         * @param {jQuery} $target - target element
         * @param {Boolean} [bKeepRatio] - keep ratio
         */
        this.resizeTo = function (pos, $target, bKeepRatio) {
            var imageSize;
            if (bKeepRatio) {
                var newRatio = pos.y / pos.x;
                var ratio = $target.data('ratio');
                imageSize = {
                    width: ratio > newRatio ? pos.x : pos.y / ratio,
                    height: ratio > newRatio ? pos.x * ratio : pos.y
                };
            } else {
                imageSize = {
                    width: pos.x,
                    height: pos.y
                };
            }

            $target.css(imageSize);
        };

        /**
         * remove media object
         *
         * @param {jQuery} $editable
         * @param {String} value - dummy argument (for keep interface)
         * @param {jQuery} $target - target element
         */
        this.removeMedia = function ($editable, value, $target) {
            beforeCommand($editable);
            $target.detach();

            handler.bindCustomEvent(
                $(), $editable.data('callbacks'), 'media.delete'
            )($target, $editable);

            afterCommand($editable);
        };

        /**
         * set focus
         *
         * @param $editable
         */
        this.focus = function ($editable) {
            $editable.focus();

            // [workaround] for firefox bug http://goo.gl/lVfAaI
            if (agent.isFF && !range.create().isOnEditable()) {
                range.createFromNode($editable[0])
                    .normalize()
                    .collapse()
                    .select();
            }
        };

        /**
         * returns whether contents is empty or not.
         *
         * @param {jQuery} $editable
         * @return {Boolean}
         */
        this.isEmpty = function ($editable) {
            return dom.isEmpty($editable[0]) || dom.emptyPara === $editable.html();
        };
    };

    /**
     * @class module.Button
     *
     * Button
     */
    var Button = function () {
        /**
         * update button status
         *
         * @param {jQuery} $container
         * @param {Object} styleInfo
         */
        this.update = function ($container, styleInfo) {
            /**
             * handle dropdown's check mark (for fontname, fontsize, lineHeight).
             * @param {jQuery} $btn
             * @param {Number} value
             */
            var checkDropdownMenu = function ($btn, value) {
                $btn.find('.dropdown-menu li a').each(function () {
                    // always compare string to avoid creating another func.
                    var isChecked = ($(this).data('value') + '') === (value + '');
                    this.className = isChecked ? 'checked' : '';
                });
            };

            /**
             * update button state(active or not).
             *
             * @private
             * @param {String} selector
             * @param {Function} pred
             */
            var btnState = function (selector, pred) {
                var $btn = $container.find(selector);
                $btn.toggleClass('active', pred());
            };

            if (styleInfo.image) {
                var $img = $(styleInfo.image);

                btnState('button[data-event="imageShape"][data-value="img-rounded"]', function () {
                    return $img.hasClass('img-rounded');
                });
                btnState('button[data-event="imageShape"][data-value="img-circle"]', function () {
                    return $img.hasClass('img-circle');
                });
                btnState('button[data-event="imageShape"][data-value="img-thumbnail"]', function () {
                    return $img.hasClass('img-thumbnail');
                });
                btnState('button[data-event="imageShape"]:not([data-value])', function () {
                    return !$img.is('.img-rounded, .img-circle, .img-thumbnail');
                });

                var imgFloat = $img.css('float');
                btnState('button[data-event="floatMe"][data-value="left"]', function () {
                    return imgFloat === 'left';
                });
                btnState('button[data-event="floatMe"][data-value="right"]', function () {
                    return imgFloat === 'right';
                });
                btnState('button[data-event="floatMe"][data-value="none"]', function () {
                    return imgFloat !== 'left' && imgFloat !== 'right';
                });

                var style = $img.attr('style');
                btnState('button[data-event="resize"][data-value="1"]', function () {
                    return !!/(^|\s)(max-)?width\s*:\s*100%/.test(style);
                });
                btnState('button[data-event="resize"][data-value="0.5"]', function () {
                    return !!/(^|\s)(max-)?width\s*:\s*50%/.test(style);
                });
                btnState('button[data-event="resize"][data-value="0.25"]', function () {
                    return !!/(^|\s)(max-)?width\s*:\s*25%/.test(style);
                });
                return;
            }

            // fontname
            var $fontname = $container.find('.note-fontname');
            if ($fontname.length) {
                var selectedFont = styleInfo['font-family'];
                if (!!selectedFont) {

                    var list = selectedFont.split(',');
                    for (var i = 0, len = list.length; i < len; i++) {
                        selectedFont = list[i].replace(/[\'\"]/g, '').replace(/\s+$/, '').replace(/^\s+/, '');
                        if (agent.isFontInstalled(selectedFont)) {
                            break;
                        }
                    }

                    $fontname.find('.note-current-fontname').text(selectedFont);
                    checkDropdownMenu($fontname, selectedFont);

                }
            }

            // fontsize
            var $fontsize = $container.find('.note-fontsize');
            $fontsize.find('.note-current-fontsize').text(styleInfo['font-size']);
            checkDropdownMenu($fontsize, parseFloat(styleInfo['font-size']));

            // lineheight
            var $lineHeight = $container.find('.note-height');
            checkDropdownMenu($lineHeight, parseFloat(styleInfo['line-height']));

            btnState('button[data-event="bold"]', function () {
                return styleInfo['font-bold'] === 'bold';
            });
            btnState('button[data-event="italic"]', function () {
                return styleInfo['font-italic'] === 'italic';
            });
            btnState('button[data-event="underline"]', function () {
                return styleInfo['font-underline'] === 'underline';
            });
            btnState('button[data-event="strikethrough"]', function () {
                return styleInfo['font-strikethrough'] === 'strikethrough';
            });
            btnState('button[data-event="superscript"]', function () {
                return styleInfo['font-superscript'] === 'superscript';
            });
            btnState('button[data-event="subscript"]', function () {
                return styleInfo['font-subscript'] === 'subscript';
            });
            btnState('button[data-event="justifyLeft"]', function () {
                return styleInfo['text-align'] === 'left' || styleInfo['text-align'] === 'start';
            });
            btnState('button[data-event="justifyCenter"]', function () {
                return styleInfo['text-align'] === 'center';
            });
            btnState('button[data-event="justifyRight"]', function () {
                return styleInfo['text-align'] === 'right';
            });
            btnState('button[data-event="justifyFull"]', function () {
                return styleInfo['text-align'] === 'justify';
            });
            btnState('button[data-event="insertUnorderedList"]', function () {
                return styleInfo['list-style'] === 'unordered';
            });
            btnState('button[data-event="insertOrderedList"]', function () {
                return styleInfo['list-style'] === 'ordered';
            });
        };

        /**
         * update recent color
         *
         * @param {Node} button
         * @param {String} eventName
         * @param {Mixed} value
         */
        this.updateRecentColor = function (button, eventName, value) {
            var $color = $(button).closest('.note-color');
            var $recentColor = $color.find('.note-recent-color');
            var colorInfo = JSON.parse($recentColor.attr('data-value'));
            colorInfo[eventName] = value;
            $recentColor.attr('data-value', JSON.stringify(colorInfo));
            var sKey = eventName === 'backColor' ? 'background-color' : 'color';
            $recentColor.find('i').css(sKey, value);
        };
    };

    /**
     * @class module.Toolbar
     *
     * Toolbar
     */
    var Toolbar = function () {
        var button = new Button();

        this.update = function ($toolbar, styleInfo) {
            button.update($toolbar, styleInfo);
        };

        /**
         * @param {Node} button
         * @param {String} eventName
         * @param {String} value
         */
        this.updateRecentColor = function (buttonNode, eventName, value) {
            button.updateRecentColor(buttonNode, eventName, value);
        };

        /**
         * activate buttons exclude codeview
         * @param {jQuery} $toolbar
         */
        this.activate = function ($toolbar) {
            $toolbar.find('button')
                .not('button[data-event="codeview"]')
                .removeClass('disabled');
        };

        /**
         * deactivate buttons exclude codeview
         * @param {jQuery} $toolbar
         */
        this.deactivate = function ($toolbar) {
            $toolbar.find('button')
                .not('button[data-event="codeview"]')
                .addClass('disabled');
        };

        /**
         * @param {jQuery} $container
         * @param {Boolean} [bFullscreen=false]
         */
        this.updateFullscreen = function ($container, bFullscreen) {
            var $btn = $container.find('button[data-event="fullscreen"]');
            $btn.toggleClass('active', bFullscreen);
        };

        /**
         * @param {jQuery} $container
         * @param {Boolean} [isCodeview=false]
         */
        this.updateCodeview = function ($container, isCodeview) {
            var $btn = $container.find('button[data-event="codeview"]');
            $btn.toggleClass('active', isCodeview);

            if (isCodeview) {
                this.deactivate($container);
            } else {
                this.activate($container);
            }
        };

        /**
         * get button in toolbar
         *
         * @param {jQuery} $editable
         * @param {String} name
         * @return {jQuery}
         */
        this.get = function ($editable, name) {
            var $toolbar = dom.makeLayoutInfo($editable).toolbar();

            return $toolbar.find('[data-name=' + name + ']');
        };

        /**
         * set button state
         * @param {jQuery} $editable
         * @param {String} name
         * @param {Boolean} [isActive=true]
         */
        this.setButtonState = function ($editable, name, isActive) {
            isActive = (isActive === false) ? false : true;

            var $button = this.get($editable, name);
            $button.toggleClass('active', isActive);
        };
    };

    var EDITABLE_PADDING = 24;

    var Statusbar = function () {
        var $document = $(document);

        this.attach = function (layoutInfo, options) {
            if (!options.disableResizeEditor) {
                layoutInfo.statusbar().on('mousedown', hStatusbarMousedown);
            }
        };

        /**
         * `mousedown` event handler on statusbar
         *
         * @param {MouseEvent} event
         */
        var hStatusbarMousedown = function (event) {
            event.preventDefault();
            event.stopPropagation();

            var $editable = dom.makeLayoutInfo(event.target).editable();
            var editableTop = $editable.offset().top - $document.scrollTop();

            var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);
            var options = layoutInfo.editor().data('options');

            $document.on('mousemove', function (event) {
                var nHeight = event.clientY - (editableTop + EDITABLE_PADDING);

                nHeight = (options.minHeight > 0) ? Math.max(nHeight, options.minHeight) : nHeight;
                nHeight = (options.maxHeight > 0) ? Math.min(nHeight, options.maxHeight) : nHeight;

                $editable.height(nHeight);
            }).one('mouseup', function () {
                $document.off('mousemove');
            });
        };
    };

    /**
     * @class module.Popover
     *
     * Popover (http://getbootstrap.com/javascript/#popovers)
     *
     */
    var Popover = function () {
        var button = new Button();

        /**
         * returns position from placeholder
         *
         * @private
         * @param {Node} placeholder
         * @param {Object} options
         * @param {Boolean} options.isAirMode
         * @return {Position}
         */
        var posFromPlaceholder = function (placeholder, options) {
            var isAirMode = options && options.isAirMode;
            var isLeftTop = options && options.isLeftTop;

            var $placeholder = $(placeholder);
            var pos = isAirMode ? $placeholder.offset() : $placeholder.position();
            var height = isLeftTop ? 0 : $placeholder.outerHeight(true); // include margin

            // popover below placeholder.
            return {
                left: pos.left,
                top: pos.top + height
            };
        };

        /**
         * show popover
         *
         * @private
         * @param {jQuery} popover
         * @param {Position} pos
         */
        var showPopover = function ($popover, pos) {
            $popover.css({
                display: 'block',
                left: pos.left,
                top: pos.top
            });
        };

        var PX_POPOVER_ARROW_OFFSET_X = 20;

        /**
         * update current state
         * @param {jQuery} $popover - popover container
         * @param {Object} styleInfo - style object
         * @param {Boolean} isAirMode
         */
        this.update = function ($popover, styleInfo, isAirMode) {
            button.update($popover, styleInfo);

            var $linkPopover = $popover.find('.note-link-popover');
            if (styleInfo.anchor) {
                var $anchor = $linkPopover.find('a');
                var href = $(styleInfo.anchor).attr('href');
                var target = $(styleInfo.anchor).attr('target');
                $anchor.attr('href', href).html(href);
                if (!target) {
                    $anchor.removeAttr('target');
                } else {
                    $anchor.attr('target', '_blank');
                }
                showPopover($linkPopover, posFromPlaceholder(styleInfo.anchor, {
                    isAirMode: isAirMode
                }));
            } else {
                $linkPopover.hide();
            }

            var $imagePopover = $popover.find('.note-image-popover');
            if (styleInfo.image) {
                showPopover($imagePopover, posFromPlaceholder(styleInfo.image, {
                    isAirMode: isAirMode,
                    isLeftTop: true
                }));
            } else {
                $imagePopover.hide();
            }

            var $airPopover = $popover.find('.note-air-popover');
            if (isAirMode && styleInfo.range && !styleInfo.range.isCollapsed()) {
                var rect = list.last(styleInfo.range.getClientRects());
                if (rect) {
                    var bnd = func.rect2bnd(rect);
                    showPopover($airPopover, {
                        left: Math.max(bnd.left + bnd.width / 2 - PX_POPOVER_ARROW_OFFSET_X, 0),
                        top: bnd.top + bnd.height
                    });
                }
            } else {
                $airPopover.hide();
            }
        };

        /**
         * @param {Node} button
         * @param {String} eventName
         * @param {String} value
         */
        this.updateRecentColor = function (button, eventName, value) {
            button.updateRecentColor(button, eventName, value);
        };

        /**
         * hide all popovers
         * @param {jQuery} $popover - popover container
         */
        this.hide = function ($popover) {
            $popover.children().hide();
        };
    };

    /**
     * @class module.Handle
     *
     * Handle
     */
    var Handle = function (handler) {
        var $document = $(document);

        /**
         * `mousedown` event handler on $handle
         *  - controlSizing: resize image
         *
         * @param {MouseEvent} event
         */
        var hHandleMousedown = function (event) {
            if (dom.isControlSizing(event.target)) {
                event.preventDefault();
                event.stopPropagation();

                var layoutInfo = dom.makeLayoutInfo(event.target),
                    $handle = layoutInfo.handle(),
                    $popover = layoutInfo.popover(),
                    $editable = layoutInfo.editable(),
                    $editor = layoutInfo.editor();

                var target = $handle.find('.note-control-selection').data('target'),
                    $target = $(target), posStart = $target.offset(),
                    scrollTop = $document.scrollTop();

                var isAirMode = $editor.data('options').airMode;

                $document.on('mousemove', function (event) {
                    handler.invoke('editor.resizeTo', {
                        x: event.clientX - posStart.left,
                        y: event.clientY - (posStart.top - scrollTop)
                    }, $target, !event.shiftKey);

                    handler.invoke('handle.update', $handle, {image: target}, isAirMode);
                    handler.invoke('popover.update', $popover, {image: target}, isAirMode);
                }).one('mouseup', function () {
                    $document.off('mousemove');
                    handler.invoke('editor.afterCommand', $editable);
                });

                if (!$target.data('ratio')) { // original ratio.
                    $target.data('ratio', $target.height() / $target.width());
                }
            }
        };

        this.attach = function (layoutInfo) {
            layoutInfo.handle().on('mousedown', hHandleMousedown);
        };

        /**
         * update handle
         * @param {jQuery} $handle
         * @param {Object} styleInfo
         * @param {Boolean} isAirMode
         */
        this.update = function ($handle, styleInfo, isAirMode) {
            var $selection = $handle.find('.note-control-selection');
            if (styleInfo.image) {
                var $image = $(styleInfo.image);
                var pos = isAirMode ? $image.offset() : $image.position();

                // include margin
                var imageSize = {
                    w: $image.outerWidth(true),
                    h: $image.outerHeight(true)
                };

                $selection.css({
                    display: 'block',
                    left: pos.left,
                    top: pos.top,
                    width: imageSize.w,
                    height: imageSize.h
                }).data('target', styleInfo.image); // save current image element.
                var sizingText = imageSize.w + 'x' + imageSize.h;
                $selection.find('.note-control-selection-info').text(sizingText);
            } else {
                $selection.hide();
            }
        };

        /**
         * hide
         *
         * @param {jQuery} $handle
         */
        this.hide = function ($handle) {
            $handle.children().hide();
        };
    };

    var Fullscreen = function (handler) {
        var $window = $(window);
        var $scrollbar = $('html, body');

        /**
         * toggle fullscreen
         *
         * @param {Object} layoutInfo
         */
        this.toggle = function (layoutInfo) {

            var $editor = layoutInfo.editor(),
                $toolbar = layoutInfo.toolbar(),
                $editable = layoutInfo.editable(),
                $codable = layoutInfo.codable();

            var resize = function (size) {
                $editable.css('height', size.h);
                $codable.css('height', size.h);
                if ($codable.data('cmeditor')) {
                    $codable.data('cmeditor').setsize(null, size.h);
                }
            };

            $editor.toggleClass('fullscreen');
            var isFullscreen = $editor.hasClass('fullscreen');
            if (isFullscreen) {
                $editable.data('orgheight', $editable.css('height'));

                $window.on('resize', function () {
                    resize({
                        h: $window.height() - $toolbar.outerHeight()
                    });
                }).trigger('resize');

                $scrollbar.css('overflow', 'hidden');
            } else {
                $window.off('resize');
                resize({
                    h: $editable.data('orgheight')
                });
                $scrollbar.css('overflow', 'visible');
            }

            handler.invoke('toolbar.updateFullscreen', $toolbar, isFullscreen);
        };
    };


    var CodeMirror;
    if (agent.hasCodeMirror) {
        if (agent.isSupportAmd) {
            require(['CodeMirror'], function (cm) {
                CodeMirror = cm;
            });
        } else {
            CodeMirror = window.CodeMirror;
        }
    }

    /**
     * @class Codeview
     */
    var Codeview = function (handler) {

        this.sync = function (layoutInfo) {
            var isCodeview = handler.invoke('codeview.isActivated', layoutInfo);
            if (isCodeview && agent.hasCodeMirror) {
                layoutInfo.codable().data('cmEditor').save();
            }
        };

        /**
         * @param {Object} layoutInfo
         * @return {Boolean}
         */
        this.isActivated = function (layoutInfo) {
            var $editor = layoutInfo.editor();
            return $editor.hasClass('codeview');
        };

        /**
         * toggle codeview
         *
         * @param {Object} layoutInfo
         */
        this.toggle = function (layoutInfo) {
            if (this.isActivated(layoutInfo)) {
                this.deactivate(layoutInfo);
            } else {
                this.activate(layoutInfo);
            }
        };

        /**
         * activate code view
         *
         * @param {Object} layoutInfo
         */
        this.activate = function (layoutInfo) {
            var $editor = layoutInfo.editor(),
                $toolbar = layoutInfo.toolbar(),
                $editable = layoutInfo.editable(),
                $codable = layoutInfo.codable(),
                $popover = layoutInfo.popover(),
                $handle = layoutInfo.handle();

            var options = $editor.data('options');

            $codable.val(dom.html($editable, options.prettifyHtml));
            $codable.height($editable.height());

            handler.invoke('toolbar.updateCodeview', $toolbar, true);
            handler.invoke('popover.hide', $popover);
            handler.invoke('handle.hide', $handle);

            $editor.addClass('codeview');

            $codable.focus();

            // activate CodeMirror as codable
            if (agent.hasCodeMirror) {
                var cmEditor = CodeMirror.fromTextArea($codable[0], options.codemirror);

                // CodeMirror TernServer
                if (options.codemirror.tern) {
                    var server = new CodeMirror.TernServer(options.codemirror.tern);
                    cmEditor.ternServer = server;
                    cmEditor.on('cursorActivity', function (cm) {
                        server.updateArgHints(cm);
                    });
                }

                // CodeMirror hasn't Padding.
                cmEditor.setSize(null, $editable.outerHeight());
                $codable.data('cmEditor', cmEditor);
            }
        };

        /**
         * deactivate code view
         *
         * @param {Object} layoutInfo
         */
        this.deactivate = function (layoutInfo) {
            var $holder = layoutInfo.holder(),
                $editor = layoutInfo.editor(),
                $toolbar = layoutInfo.toolbar(),
                $editable = layoutInfo.editable(),
                $codable = layoutInfo.codable();

            var options = $editor.data('options');

            // deactivate CodeMirror as codable
            if (agent.hasCodeMirror) {
                var cmEditor = $codable.data('cmEditor');
                $codable.val(cmEditor.getValue());
                cmEditor.toTextArea();
            }

            var value = dom.value($codable, options.prettifyHtml) || dom.emptyPara;
            var isChange = $editable.html() !== value;

            $editable.html(value);
            $editable.height(options.height ? $codable.height() : 'auto');
            $editor.removeClass('codeview');

            if (isChange) {
                handler.bindCustomEvent(
                    $holder, $editable.data('callbacks'), 'change'
                )($editable.html(), $editable);
            }

            $editable.focus();

            handler.invoke('toolbar.updateCodeview', $toolbar, false);
        };
    };

    var DragAndDrop = function (handler) {
        var $document = $(document);

        /**
         * attach Drag and Drop Events
         *
         * @param {Object} layoutInfo - layout Informations
         * @param {Object} options
         */
        this.attach = function (layoutInfo, options) {
            if (options.airMode || options.disableDragAndDrop) {
                // prevent default drop event
                $document.on('drop', function (e) {
                    e.preventDefault();
                });
            } else {
                this.attachDragAndDropEvent(layoutInfo, options);
            }
        };

        /**
         * attach Drag and Drop Events
         *
         * @param {Object} layoutInfo - layout Informations
         * @param {Object} options
         */
        this.attachDragAndDropEvent = function (layoutInfo, options) {
            var collection = $(),
                $editor = layoutInfo.editor(),
                $dropzone = layoutInfo.dropzone(),
                $dropzoneMessage = $dropzone.find('.note-dropzone-message');

            // show dropzone on dragenter when dragging a object to document
            // -but only if the editor is visible, i.e. has a positive width and height
            $document.on('dragenter', function (e) {
                var isCodeview = handler.invoke('codeview.isActivated', layoutInfo);
                var hasEditorSize = $editor.width() > 0 && $editor.height() > 0;
                if (!isCodeview && !collection.length && hasEditorSize) {
                    $editor.addClass('dragover');
                    $dropzone.width($editor.width());
                    $dropzone.height($editor.height());
                    $dropzoneMessage.text(options.langInfo.image.dragImageHere);
                }
                collection = collection.add(e.target);
            }).on('dragleave', function (e) {
                collection = collection.not(e.target);
                if (!collection.length) {
                    $editor.removeClass('dragover');
                }
            }).on('drop', function () {
                collection = $();
                $editor.removeClass('dragover');
            });

            // change dropzone's message on hover.
            $dropzone.on('dragenter', function () {
                $dropzone.addClass('hover');
                $dropzoneMessage.text(options.langInfo.image.dropImage);
            }).on('dragleave', function () {
                $dropzone.removeClass('hover');
                $dropzoneMessage.text(options.langInfo.image.dragImageHere);
            });

            // attach dropImage
            $dropzone.on('drop', function (event) {

                var dataTransfer = event.originalEvent.dataTransfer;
                var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);

                if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                    event.preventDefault();
                    layoutInfo.editable().focus();
                    handler.insertImages(layoutInfo, dataTransfer.files);
                } else {
                    var insertNodefunc = function () {
                        layoutInfo.holder().summernote('insertNode', this);
                    };

                    for (var i = 0, len = dataTransfer.types.length; i < len; i++) {
                        var type = dataTransfer.types[i];
                        var content = dataTransfer.getData(type);

                        if (type.toLowerCase().indexOf('text') > -1) {
                            layoutInfo.holder().summernote('pasteHTML', content);
                        } else {
                            $(content).each(insertNodefunc);
                        }
                    }
                }
            }).on('dragover', false); // prevent default dragover event
        };
    };

    var Clipboard = function (handler) {
        var $paste;

        this.attach = function (layoutInfo) {
            // [workaround] getting image from clipboard
            //  - IE11 and Firefox: CTRL+v hook
            //  - Webkit: event.clipboardData
            if ((agent.isMSIE && agent.browserVersion > 10) || agent.isFF) {
                $paste = $('<div />').attr('contenteditable', true).css({
                    position: 'absolute',
                    left: -100000,
                    opacity: 0
                });

                layoutInfo.editable().on('keydown', function (e) {
                    if (e.ctrlKey && e.keyCode === key.code.V) {
                        handler.invoke('saveRange', layoutInfo.editable());
                        $paste.focus();

                        setTimeout(function () {
                            pasteByHook(layoutInfo);
                        }, 0);
                    }
                });

                layoutInfo.editable().before($paste);
            } else {
                layoutInfo.editable().on('paste', pasteByEvent);
            }
        };

        var pasteByHook = function (layoutInfo) {
            var $editable = layoutInfo.editable();
            var node = $paste[0].firstChild;

            if (dom.isImg(node)) {
                var dataURI = node.src;
                var decodedData = atob(dataURI.split(',')[1]);
                var array = new Uint8Array(decodedData.length);
                for (var i = 0; i < decodedData.length; i++) {
                    array[i] = decodedData.charCodeAt(i);
                }

                var blob = new Blob([array], {type: 'image/png'});
                blob.name = 'clipboard.png';

                handler.invoke('restoreRange', $editable);
                handler.invoke('focus', $editable);
                handler.insertImages(layoutInfo, [blob]);
            } else {
                var pasteContent = $('<div />').html($paste.html()).html();
                handler.invoke('restoreRange', $editable);
                handler.invoke('focus', $editable);

                if (pasteContent) {
                    handler.invoke('pasteHTML', $editable, pasteContent);
                }
            }

            $paste.empty();
        };

        /**
         * paste by clipboard event
         *
         * @param {Event} event
         */
        var pasteByEvent = function (event) {
            var clipboardData = event.originalEvent.clipboardData;
            var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);
            var $editable = layoutInfo.editable();

            if (clipboardData && clipboardData.items && clipboardData.items.length) {
                var item = list.head(clipboardData.items);
                if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                    handler.insertImages(layoutInfo, [item.getAsFile()]);
                }
                handler.invoke('editor.afterCommand', $editable);
            }
        };
    };

    var LinkDialog = function (handler) {

        /**
         * toggle button status
         *
         * @private
         * @param {jQuery} $btn
         * @param {Boolean} isEnable
         */
        var toggleBtn = function ($btn, isEnable) {
            $btn.toggleClass('disabled', !isEnable);
            $btn.attr('disabled', !isEnable);
        };

        /**
         * bind enter key
         *
         * @private
         * @param {jQuery} $input
         * @param {jQuery} $btn
         */
        var bindEnterKey = function ($input, $btn) {
            $input.on('keypress', function (event) {
                if (event.keyCode === key.code.ENTER) {
                    $btn.trigger('click');
                }
            });
        };

        /**
         * Show link dialog and set event handlers on dialog controls.
         *
         * @param {jQuery} $editable
         * @param {jQuery} $dialog
         * @param {Object} linkInfo
         * @return {Promise}
         */
        this.showLinkDialog = function ($editable, $dialog, linkInfo) {
            return $.Deferred(function (deferred) {
                var $linkDialog = $dialog.find('.note-link-dialog');

                var $linkText = $linkDialog.find('.note-link-text'),
                    $linkUrl = $linkDialog.find('.note-link-url'),
                    $linkBtn = $linkDialog.find('.note-link-btn'),
                    $openInNewWindow = $linkDialog.find('input[type=checkbox]');

                $linkDialog.one('shown.bs.modal', function () {
                    $linkText.val(linkInfo.text);

                    $linkText.on('input', function () {
                        toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
                        // if linktext was modified by keyup,
                        // stop cloning text from linkUrl
                        linkInfo.text = $linkText.val();
                    });

                    // if no url was given, copy text to url
                    if (!linkInfo.url) {
                        linkInfo.url = linkInfo.text || 'http://';
                        toggleBtn($linkBtn, linkInfo.text);
                    }

                    $linkUrl.on('input', function () {
                        toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
                        // display same link on `Text to display` input
                        // when create a new link
                        if (!linkInfo.text) {
                            $linkText.val($linkUrl.val());
                        }
                    }).val(linkInfo.url).trigger('focus').trigger('select');

                    bindEnterKey($linkUrl, $linkBtn);
                    bindEnterKey($linkText, $linkBtn);

                    $openInNewWindow.prop('checked', linkInfo.isNewWindow);

                    $linkBtn.one('click', function (event) {
                        event.preventDefault();

                        deferred.resolve({
                            range: linkInfo.range,
                            url: $linkUrl.val(),
                            text: $linkText.val(),
                            isNewWindow: $openInNewWindow.is(':checked')
                        });
                        $linkDialog.modal('hide');
                    });
                }).one('hidden.bs.modal', function () {
                    // detach events
                    $linkText.off('input keypress');
                    $linkUrl.off('input keypress');
                    $linkBtn.off('click');

                    if (deferred.state() === 'pending') {
                        deferred.reject();
                    }
                }).modal('show');
            }).promise();
        };

        /**
         * @param {Object} layoutInfo
         */
        this.show = function (layoutInfo) {
            var $editor = layoutInfo.editor(),
                $dialog = layoutInfo.dialog(),
                $editable = layoutInfo.editable(),
                $popover = layoutInfo.popover(),
                linkInfo = handler.invoke('editor.getLinkInfo', $editable);

            var options = $editor.data('options');

            handler.invoke('editor.saveRange', $editable);
            this.showLinkDialog($editable, $dialog, linkInfo).then(function (linkInfo) {
                handler.invoke('editor.restoreRange', $editable);
                handler.invoke('editor.createLink', $editable, linkInfo, options);
                // hide popover after creating link
                handler.invoke('popover.hide', $popover);
            }).fail(function () {
                handler.invoke('editor.restoreRange', $editable);
            });
        };
    };

    var ImageDialog = function (handler) {
        /**
         * toggle button status
         *
         * @private
         * @param {jQuery} $btn
         * @param {Boolean} isEnable
         */
        var toggleBtn = function ($btn, isEnable) {
            $btn.toggleClass('disabled', !isEnable);
            $btn.attr('disabled', !isEnable);
        };

        /**
         * bind enter key
         *
         * @private
         * @param {jQuery} $input
         * @param {jQuery} $btn
         */
        var bindEnterKey = function ($input, $btn) {
            $input.on('keypress', function (event) {
                if (event.keyCode === key.code.ENTER) {
                    $btn.trigger('click');
                }
            });
        };

        this.show = function (layoutInfo) {
            var $dialog = layoutInfo.dialog(),
                $editable = layoutInfo.editable();

            handler.invoke('editor.saveRange', $editable);
            this.showImageDialog($editable, $dialog).then(function (data) {
                handler.invoke('editor.restoreRange', $editable);

                if (typeof data === 'string') {
                    // image url
                    handler.invoke('editor.insertImage', $editable, data);
                } else {
                    // array of files
                    handler.insertImages(layoutInfo, data);
                }
            }).fail(function () {
                handler.invoke('editor.restoreRange', $editable);
            });
        };

        /**
         * show image dialog
         *
         * @param {jQuery} $editable
         * @param {jQuery} $dialog
         * @return {Promise}
         */
        this.showImageDialog = function ($editable, $dialog) {
            return $.Deferred(function (deferred) {
                var $imageDialog = $dialog.find('.note-image-dialog');

                var $imageInput = $dialog.find('.note-image-input'),
                    $imageUrl = $dialog.find('.note-image-url'),
                    $imageBtn = $dialog.find('.note-image-btn');

                $imageDialog.one('shown.bs.modal', function () {
                    // Cloning imageInput to clear element.
                    $imageInput.replaceWith($imageInput.clone()
                            .on('change', function () {
                                deferred.resolve(this.files || this.value);
                                $imageDialog.modal('hide');
                            })
                            .val('')
                    );

                    $imageBtn.click(function (event) {
                        event.preventDefault();

                        deferred.resolve($imageUrl.val());
                        $imageDialog.modal('hide');
                    });

                    $imageUrl.on('keyup paste', function (event) {
                        var url;

                        if (event.type === 'paste') {
                            url = event.originalEvent.clipboardData.getData('text');
                        } else {
                            url = $imageUrl.val();
                        }

                        toggleBtn($imageBtn, url);
                    }).val('').trigger('focus');
                    bindEnterKey($imageUrl, $imageBtn);
                }).one('hidden.bs.modal', function () {
                    $imageInput.off('change');
                    $imageUrl.off('keyup paste keypress');
                    $imageBtn.off('click');

                    if (deferred.state() === 'pending') {
                        deferred.reject();
                    }
                }).modal('show');
            });
        };
    };

    var HelpDialog = function (handler) {
        /**
         * show help dialog
         *
         * @param {jQuery} $editable
         * @param {jQuery} $dialog
         * @return {Promise}
         */
        this.showHelpDialog = function ($editable, $dialog) {
            return $.Deferred(function (deferred) {
                var $helpDialog = $dialog.find('.note-help-dialog');

                $helpDialog.one('hidden.bs.modal', function () {
                    deferred.resolve();
                }).modal('show');
            }).promise();
        };

        /**
         * @param {Object} layoutInfo
         */
        this.show = function (layoutInfo) {
            var $dialog = layoutInfo.dialog(),
                $editable = layoutInfo.editable();

            handler.invoke('editor.saveRange', $editable, true);
            this.showHelpDialog($editable, $dialog).then(function () {
                handler.invoke('editor.restoreRange', $editable);
            });
        };
    };


    /**
     * @class EventHandler
     *
     * EventHandler
     *  - TODO: new instance per a editor
     */
    var EventHandler = function () {
        var self = this;

        /**
         * Modules
         */
        var modules = this.modules = {
            editor: new Editor(this),
            toolbar: new Toolbar(this),
            statusbar: new Statusbar(this),
            popover: new Popover(this),
            handle: new Handle(this),
            fullscreen: new Fullscreen(this),
            codeview: new Codeview(this),
            dragAndDrop: new DragAndDrop(this),
            clipboard: new Clipboard(this),
            linkDialog: new LinkDialog(this),
            imageDialog: new ImageDialog(this),
            helpDialog: new HelpDialog(this)
        };

        /**
         * invoke module's method
         *
         * @param {String} moduleAndMethod - ex) 'editor.redo'
         * @param {...*} arguments - arguments of method
         * @return {*}
         */
        this.invoke = function () {
            var moduleAndMethod = list.head(list.from(arguments));
            var args = list.tail(list.from(arguments));

            var splits = moduleAndMethod.split('.');
            var hasSeparator = splits.length > 1;
            var moduleName = hasSeparator && list.head(splits);
            var methodName = hasSeparator ? list.last(splits) : list.head(splits);

            var module = this.getModule(moduleName);
            var method = module[methodName];

            return method && method.apply(module, args);
        };

        /**
         * returns module
         *
         * @param {String} moduleName - name of module
         * @return {Module} - defaults is editor
         */
        this.getModule = function (moduleName) {
            return this.modules[moduleName] || this.modules.editor;
        };

        /**
         * @param {jQuery} $holder
         * @param {Object} callbacks
         * @param {String} eventNamespace
         * @returns {Function}
         */
        var bindCustomEvent = this.bindCustomEvent = function ($holder, callbacks, eventNamespace) {
            return function () {
                var callback = callbacks[func.namespaceToCamel(eventNamespace, 'on')];
                if (callback) {
                    callback.apply($holder[0], arguments);
                }
                return $holder.trigger('summernote.' + eventNamespace, arguments);
            };
        };

        /**
         * insert Images from file array.
         *
         * @private
         * @param {Object} layoutInfo
         * @param {File[]} files
         */
        this.insertImages = function (layoutInfo, files) {
            var $editor = layoutInfo.editor(),
                $editable = layoutInfo.editable(),
                $holder = layoutInfo.holder();

            var callbacks = $editable.data('callbacks');
            var options = $editor.data('options');

            // If onImageUpload options setted
            if (callbacks.onImageUpload) {
                bindCustomEvent($holder, callbacks, 'image.upload')(files);
                // else insert Image as dataURL
            } else {
                $.each(files, function (idx, file) {
                    var filename = file.name;
                    if (options.maximumImageFileSize && options.maximumImageFileSize < file.size) {
                        bindCustomEvent($holder, callbacks, 'image.upload.error')(options.langInfo.image.maximumFileSizeError);
                    } else {
                        async.readFileAsDataURL(file).then(function (sDataURL) {
                            modules.editor.insertImage($editable, sDataURL, filename);
                        }).fail(function () {
                            bindCustomEvent($holder, callbacks, 'image.upload.error')(options.langInfo.image.maximumFileSizeError);
                        });
                    }
                });
            }
        };

        var commands = {
            /**
             * @param {Object} layoutInfo
             */
            showLinkDialog: function (layoutInfo) {
                modules.linkDialog.show(layoutInfo);
            },

            /**
             * @param {Object} layoutInfo
             */
            showImageDialog: function (layoutInfo) {
                modules.imageDialog.show(layoutInfo);
            },

            /**
             * @param {Object} layoutInfo
             */
            showHelpDialog: function (layoutInfo) {
                modules.helpDialog.show(layoutInfo);
            },

            /**
             * @param {Object} layoutInfo
             */
            fullscreen: function (layoutInfo) {
                modules.fullscreen.toggle(layoutInfo);
            },

            /**
             * @param {Object} layoutInfo
             */
            codeview: function (layoutInfo) {
                modules.codeview.toggle(layoutInfo);
            }
        };

        var hMousedown = function (event) {
            //preventDefault Selection for FF, IE8+
            if (dom.isImg(event.target)) {
                event.preventDefault();
            }
        };

        var hKeyupAndMouseup = function (event) {
            var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);
            modules.editor.removeBogus(layoutInfo.editable());
            hToolbarAndPopoverUpdate(event);
        };

        /**
         * update sytle info
         * @param {Object} styleInfo
         * @param {Object} layoutInfo
         */
        this.updateStyleInfo = function (styleInfo, layoutInfo) {
            if (!styleInfo) {
                return;
            }
            var isAirMode = layoutInfo.editor().data('options').airMode;
            if (!isAirMode) {
                modules.toolbar.update(layoutInfo.toolbar(), styleInfo);
            }

            modules.popover.update(layoutInfo.popover(), styleInfo, isAirMode);
            modules.handle.update(layoutInfo.handle(), styleInfo, isAirMode);
        };

        var hToolbarAndPopoverUpdate = function (event) {
            var target = event.target;
            // delay for range after mouseup
            setTimeout(function () {
                var layoutInfo = dom.makeLayoutInfo(target);
                var styleInfo = modules.editor.currentStyle(target);
                self.updateStyleInfo(styleInfo, layoutInfo);
            }, 0);
        };

        var hScroll = function (event) {
            var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);
            //hide popover and handle when scrolled
            modules.popover.hide(layoutInfo.popover());
            modules.handle.hide(layoutInfo.handle());
        };

        var hToolbarAndPopoverMousedown = function (event) {
            // prevent default event when insertTable (FF, Webkit)
            var $btn = $(event.target).closest('[data-event]');
            if ($btn.length) {
                event.preventDefault();
            }
        };

        var hToolbarAndPopoverClick = function (event) {
            var $btn = $(event.target).closest('[data-event]');

            if (!$btn.length) {
                return;
            }

            var eventName = $btn.attr('data-event'),
                value = $btn.attr('data-value'),
                hide = $btn.attr('data-hide');

            var layoutInfo = dom.makeLayoutInfo(event.target);

            // before command: detect control selection element($target)
            var $target;
            if ($.inArray(eventName, ['resize', 'floatMe', 'removeMedia', 'imageShape']) !== -1) {
                var $selection = layoutInfo.handle().find('.note-control-selection');
                $target = $($selection.data('target'));
            }

            // If requested, hide the popover when the button is clicked.
            // Useful for things like showHelpDialog.
            if (hide) {
                $btn.parents('.popover').hide();
            }

            if ($.isFunction($.summernote.pluginEvents[eventName])) {
                $.summernote.pluginEvents[eventName](event, modules.editor, layoutInfo, value);
            } else if (modules.editor[eventName]) { // on command
                var $editable = layoutInfo.editable();
                $editable.focus();
                modules.editor[eventName]($editable, value, $target);
                event.preventDefault();
            } else if (commands[eventName]) {
                commands[eventName].call(this, layoutInfo);
                event.preventDefault();
            }

            // after command
            if ($.inArray(eventName, ['backColor', 'foreColor']) !== -1) {
                var options = layoutInfo.editor().data('options', options);
                var module = options.airMode ? modules.popover : modules.toolbar;
                module.updateRecentColor(list.head($btn), eventName, value);
            }

            hToolbarAndPopoverUpdate(event);
        };

        var PX_PER_EM = 18;
        var hDimensionPickerMove = function (event, options) {
            var $picker = $(event.target.parentNode); // target is mousecatcher
            var $dimensionDisplay = $picker.next();
            var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
            var $highlighted = $picker.find('.note-dimension-picker-highlighted');
            var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');

            var posOffset;
            // HTML5 with jQuery - e.offsetX is undefined in Firefox
            if (event.offsetX === undefined) {
                var posCatcher = $(event.target).offset();
                posOffset = {
                    x: event.pageX - posCatcher.left,
                    y: event.pageY - posCatcher.top
                };
            } else {
                posOffset = {
                    x: event.offsetX,
                    y: event.offsetY
                };
            }

            var dim = {
                c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
                r: Math.ceil(posOffset.y / PX_PER_EM) || 1
            };

            $highlighted.css({width: dim.c + 'em', height: dim.r + 'em'});
            $catcher.attr('data-value', dim.c + 'x' + dim.r);

            if (3 < dim.c && dim.c < options.insertTableMaxSize.col) {
                $unhighlighted.css({width: dim.c + 1 + 'em'});
            }

            if (3 < dim.r && dim.r < options.insertTableMaxSize.row) {
                $unhighlighted.css({height: dim.r + 1 + 'em'});
            }

            $dimensionDisplay.html(dim.c + ' x ' + dim.r);
        };

        /**
         * bind KeyMap on keydown
         *
         * @param {Object} layoutInfo
         * @param {Object} keyMap
         */
        this.bindKeyMap = function (layoutInfo, keyMap) {
            var $editor = layoutInfo.editor();
            var $editable = layoutInfo.editable();

            $editable.on('keydown', function (event) {
                var keys = [];

                // modifier
                if (event.metaKey) {
                    keys.push('CMD');
                }
                if (event.ctrlKey && !event.altKey) {
                    keys.push('CTRL');
                }
                if (event.shiftKey) {
                    keys.push('SHIFT');
                }

                // keycode
                var keyName = key.nameFromCode[event.keyCode];
                if (keyName) {
                    keys.push(keyName);
                }

                var pluginEvent;
                var keyString = keys.join('+');
                var eventName = keyMap[keyString];
                if (eventName) {
                    // FIXME Summernote doesn't support event pipeline yet.
                    //  - Plugin -> Base Code
                    pluginEvent = $.summernote.pluginEvents[keyString];
                    if ($.isFunction(pluginEvent)) {
                        if (pluginEvent(event, modules.editor, layoutInfo)) {
                            return false;
                        }
                    }

                    pluginEvent = $.summernote.pluginEvents[eventName];

                    if ($.isFunction(pluginEvent)) {
                        pluginEvent(event, modules.editor, layoutInfo);
                    } else if (modules.editor[eventName]) {
                        modules.editor[eventName]($editable, $editor.data('options'));
                        event.preventDefault();
                    } else if (commands[eventName]) {
                        commands[eventName].call(this, layoutInfo);
                        event.preventDefault();
                    }
                } else if (key.isEdit(event.keyCode)) {
                    modules.editor.afterCommand($editable);
                }
            });
        };

        /**
         * attach eventhandler
         *
         * @param {Object} layoutInfo - layout Informations
         * @param {Object} options - user options include custom event handlers
         */
        this.attach = function (layoutInfo, options) {
            // handlers for editable
            if (options.shortcuts) {
                this.bindKeyMap(layoutInfo, options.keyMap[agent.isMac ? 'mac' : 'pc']);
            }
            layoutInfo.editable().on('mousedown', hMousedown);
            layoutInfo.editable().on('keyup mouseup', hKeyupAndMouseup);
            layoutInfo.editable().on('scroll', hScroll);

            // handler for clipboard
            modules.clipboard.attach(layoutInfo, options);

            // handler for handle and popover
            modules.handle.attach(layoutInfo, options);
            layoutInfo.popover().on('click', hToolbarAndPopoverClick);
            layoutInfo.popover().on('mousedown', hToolbarAndPopoverMousedown);

            // handler for drag and drop
            modules.dragAndDrop.attach(layoutInfo, options);

            // handlers for frame mode (toolbar, statusbar)
            if (!options.airMode) {
                // handler for toolbar
                layoutInfo.toolbar().on('click', hToolbarAndPopoverClick);
                layoutInfo.toolbar().on('mousedown', hToolbarAndPopoverMousedown);

                // handler for statusbar
                modules.statusbar.attach(layoutInfo, options);
            }

            // handler for table dimension
            var $catcherContainer = options.airMode ? layoutInfo.popover() :
                layoutInfo.toolbar();
            var $catcher = $catcherContainer.find('.note-dimension-picker-mousecatcher');
            $catcher.css({
                width: options.insertTableMaxSize.col + 'em',
                height: options.insertTableMaxSize.row + 'em'
            }).on('mousemove', function (event) {
                hDimensionPickerMove(event, options);
            });

            // save options on editor
            layoutInfo.editor().data('options', options);

            // ret styleWithCSS for backColor / foreColor clearing with 'inherit'.
            if (!agent.isMSIE) {
                // [workaround] for Firefox
                //  - protect FF Error: NS_ERROR_FAILURE: Failure
                setTimeout(function () {
                    document.execCommand('styleWithCSS', 0, options.styleWithSpan);
                }, 0);
            }

            // History
            var history = new History(layoutInfo.editable());
            layoutInfo.editable().data('NoteHistory', history);

            // All editor status will be saved on editable with jquery's data
            // for support multiple editor with singleton object.
            layoutInfo.editable().data('callbacks', {
                onInit: options.onInit,
                onFocus: options.onFocus,
                onBlur: options.onBlur,
                onKeydown: options.onKeydown,
                onKeyup: options.onKeyup,
                onMousedown: options.onMousedown,
                onEnter: options.onEnter,
                onPaste: options.onPaste,
                onBeforeCommand: options.onBeforeCommand,
                onChange: options.onChange,
                onImageUpload: options.onImageUpload,
                onImageUploadError: options.onImageUploadError,
                onMediaDelete: options.onMediaDelete,
                onToolbarClick: options.onToolbarClick
            });

            var styleInfo = modules.editor.styleFromNode(layoutInfo.editable());
            this.updateStyleInfo(styleInfo, layoutInfo);
        };

        /**
         * attach jquery custom event
         *
         * @param {Object} layoutInfo - layout Informations
         */
        this.attachCustomEvent = function (layoutInfo, options) {
            var $holder = layoutInfo.holder();
            var $editable = layoutInfo.editable();
            var callbacks = $editable.data('callbacks');

            $editable.focus(bindCustomEvent($holder, callbacks, 'focus'));
            $editable.blur(bindCustomEvent($holder, callbacks, 'blur'));

            $editable.keydown(function (event) {
                if (event.keyCode === key.code.ENTER) {
                    bindCustomEvent($holder, callbacks, 'enter').call(this, event);
                }
                bindCustomEvent($holder, callbacks, 'keydown').call(this, event);
            });
            $editable.keyup(bindCustomEvent($holder, callbacks, 'keyup'));

            $editable.on('mousedown', bindCustomEvent($holder, callbacks, 'mousedown'));
            $editable.on('mouseup', bindCustomEvent($holder, callbacks, 'mouseup'));
            $editable.on('scroll', bindCustomEvent($holder, callbacks, 'scroll'));

            $editable.on('paste', bindCustomEvent($holder, callbacks, 'paste'));

            // [workaround] IE doesn't have input events for contentEditable
            //  - see: https://goo.gl/4bfIvA
            var changeEventName = agent.isMSIE ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
            $editable.on(changeEventName, function () {
                bindCustomEvent($holder, callbacks, 'change')($editable.html(), $editable);
            });

            if (!options.airMode) {
                layoutInfo.toolbar().click(bindCustomEvent($holder, callbacks, 'toolbar.click'));
                layoutInfo.popover().click(bindCustomEvent($holder, callbacks, 'popover.click'));
            }

            // Textarea: auto filling the code before form submit.
            if (dom.isTextarea(list.head($holder))) {
                $holder.closest('form').submit(function (e) {
                    layoutInfo.holder().val(layoutInfo.holder().code());
                    bindCustomEvent($holder, callbacks, 'submit').call(this, e, $holder.code());
                });
            }

            // textarea auto sync
            if (dom.isTextarea(list.head($holder)) && options.textareaAutoSync) {
                $holder.on('summernote.change', function () {
                    layoutInfo.holder().val(layoutInfo.holder().code());
                });
            }

            // fire init event
            bindCustomEvent($holder, callbacks, 'init')(layoutInfo);

            // fire plugin init event
            for (var i = 0, len = $.summernote.plugins.length; i < len; i++) {
                if ($.isFunction($.summernote.plugins[i].init)) {
                    $.summernote.plugins[i].init(layoutInfo);
                }
            }
        };

        this.detach = function (layoutInfo, options) {
            layoutInfo.holder().off();
            layoutInfo.editable().off();

            layoutInfo.popover().off();
            layoutInfo.handle().off();
            layoutInfo.dialog().off();

            if (!options.airMode) {
                layoutInfo.dropzone().off();
                layoutInfo.toolbar().off();
                layoutInfo.statusbar().off();
            }
        };
    };

    /**
     * @class Renderer
     *
     * renderer
     *
     * rendering toolbar and editable
     */
    var Renderer = function () {

        /**
         * bootstrap button template
         * @private
         * @param {String} label button name
         * @param {Object} [options] button options
         * @param {String} [options.event] data-event
         * @param {String} [options.className] button's class name
         * @param {String} [options.value] data-value
         * @param {String} [options.title] button's title for popup
         * @param {String} [options.dropdown] dropdown html
         * @param {String} [options.hide] data-hide
         */
        var tplButton = function (label, options) {
            var event = options.event;
            var value = options.value;
            var title = options.title;
            var className = options.className;
            var dropdown = options.dropdown;
            var hide = options.hide;

            return (dropdown ? '<div class="btn-group' +
                (className ? ' ' + className : '') + '">' : '') +
                '<button type="button"' +
                ' class="btn btn-default btn-sm' +
                ((!dropdown && className) ? ' ' + className : '') +
                (dropdown ? ' dropdown-toggle' : '') +
                '"' +
                (dropdown ? ' data-toggle="dropdown"' : '') +
                (title ? ' title="' + title + '"' : '') +
                (event ? ' data-event="' + event + '"' : '') +
                (value ? ' data-value=\'' + value + '\'' : '') +
                (hide ? ' data-hide=\'' + hide + '\'' : '') +
                ' tabindex="-1">' +
                label +
                (dropdown ? ' <span class="caret"></span>' : '') +
                '</button>' +
                (dropdown || '') +
                (dropdown ? '</div>' : '');
        };

        /**
         * bootstrap icon button template
         * @private
         * @param {String} iconClassName
         * @param {Object} [options]
         * @param {String} [options.event]
         * @param {String} [options.value]
         * @param {String} [options.title]
         * @param {String} [options.dropdown]
         */
        var tplIconButton = function (iconClassName, options) {
            var label = '<i class="' + iconClassName + '"></i>';
            return tplButton(label, options);
        };

        /**
         * bootstrap popover template
         * @private
         * @param {String} className
         * @param {String} content
         */
        var tplPopover = function (className, content) {
            var $popover = $('<div class="' + className + ' popover bottom in" style="display: none;">' +
                '<div class="arrow"></div>' +
                '<div class="popover-content">' +
                '</div>' +
                '</div>');

            $popover.find('.popover-content').append(content);
            return $popover;
        };

        /**
         * bootstrap dialog template
         *
         * @param {String} className
         * @param {String} [title='']
         * @param {String} body
         * @param {String} [footer='']
         */
        var tplDialog = function (className, title, body, footer) {
            return '<div class="' + className + ' modal" aria-hidden="false">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                (title ?
                    '<div class="modal-header">' +
                    '<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>' +
                    '<h4 class="modal-title">' + title + '</h4>' +
                    '</div>' : ''
                ) +
                '<div class="modal-body">' + body + '</div>' +
                (footer ?
                    '<div class="modal-footer">' + footer + '</div>' : ''
                ) +
                '</div>' +
                '</div>' +
                '</div>';
        };

        /**
         * bootstrap dropdown template
         *
         * @param {String|String[]} contents
         * @param {String} [className='']
         * @param {String} [nodeName='']
         */
        var tplDropdown = function (contents, className, nodeName) {
            var classes = 'dropdown-menu' + (className ? ' ' + className : '');
            nodeName = nodeName || 'ul';
            if (contents instanceof Array) {
                contents = contents.join('');
            }

            return '<' + nodeName + ' class="' + classes + '">' + contents + '</' + nodeName + '>';
        };

        var tplButtonInfo = {
            picture: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.image.image, {
                    event: 'showImageDialog',
                    title: lang.image.image,
                    hide: true
                });
            },
            link: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.link.link, {
                    event: 'showLinkDialog',
                    title: lang.link.link,
                    hide: true
                });
            },
            table: function (lang, options) {
                var dropdown = [
                    '<div class="note-dimension-picker">',
                    '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>',
                    '<div class="note-dimension-picker-highlighted"></div>',
                    '<div class="note-dimension-picker-unhighlighted"></div>',
                    '</div>',
                    '<div class="note-dimension-display"> 1 x 1 </div>'
                ];

                return tplIconButton(options.iconPrefix + options.icons.table.table, {
                    title: lang.table.table,
                    dropdown: tplDropdown(dropdown, 'note-table')
                });
            },
            style: function (lang, options) {
                var items = options.styleTags.reduce(function (memo, v) {
                    var label = lang.style[v === 'p' ? 'normal' : v];
                    return memo + '<li><a data-event="formatBlock" href="#" data-value="' + v + '">' +
                        (
                            (v === 'p' || v === 'pre') ? label :
                            '<' + v + '>' + label + '</' + v + '>'
                        ) +
                        '</a></li>';
                }, '');

                return tplIconButton(options.iconPrefix + options.icons.style.style, {
                    title: lang.style.style,
                    dropdown: tplDropdown(items)
                });
            },
            fontname: function (lang, options) {
                var realFontList = [];
                var items = options.fontNames.reduce(function (memo, v) {
                    if (!agent.isFontInstalled(v) && !list.contains(options.fontNamesIgnoreCheck, v)) {
                        return memo;
                    }
                    realFontList.push(v);
                    return memo + '<li><a data-event="fontName" href="#" data-value="' + v + '" style="font-family:\'' + v + '\'">' +
                        '<i class="' + options.iconPrefix + options.icons.misc.check + '"></i> ' + v +
                        '</a></li>';
                }, '');

                var hasDefaultFont = agent.isFontInstalled(options.defaultFontName);
                var defaultFontName = (hasDefaultFont) ? options.defaultFontName : realFontList[0];

                var label = '<span class="note-current-fontname">' +
                    defaultFontName +
                    '</span>';
                return tplButton(label, {
                    title: lang.font.name,
                    className: 'note-fontname',
                    dropdown: tplDropdown(items, 'note-check')
                });
            },
            fontsize: function (lang, options) {
                var items = options.fontSizes.reduce(function (memo, v) {
                    return memo + '<li><a data-event="fontSize" href="#" data-value="' + v + '">' +
                        '<i class="' + options.iconPrefix + options.icons.misc.check + '"></i> ' + v +
                        '</a></li>';
                }, '');

                var label = '<span class="note-current-fontsize">11</span>';
                return tplButton(label, {
                    title: lang.font.size,
                    className: 'note-fontsize',
                    dropdown: tplDropdown(items, 'note-check')
                });
            },
            color: function (lang, options) {
                var colorButtonLabel = '<i class="' +
                    options.iconPrefix + options.icons.color.recent +
                    '" style="color:black;background-color:yellow;"></i>';

                var colorButton = tplButton(colorButtonLabel, {
                    className: 'note-recent-color',
                    title: lang.color.recent,
                    event: 'color',
                    value: '{"backColor":"yellow"}'
                });

                var items = [
                    '<li><div class="btn-group">',
                    '<div class="note-palette-title">' + lang.color.background + '</div>',
                    '<div class="note-color-reset" data-event="backColor"',
                    ' data-value="inherit" title="' + lang.color.transparent + '">' + lang.color.setTransparent + '</div>',
                    '<div class="note-color-palette" data-target-event="backColor"></div>',
                    '</div><div class="btn-group">',
                    '<div class="note-palette-title">' + lang.color.foreground + '</div>',
                    '<div class="note-color-reset" data-event="foreColor" data-value="inherit" title="' + lang.color.reset + '">',
                    lang.color.resetToDefault,
                    '</div>',
                    '<div class="note-color-palette" data-target-event="foreColor"></div>',
                    '</div></li>'
                ];

                var moreButton = tplButton('', {
                    title: lang.color.more,
                    dropdown: tplDropdown(items)
                });

                return colorButton + moreButton;
            },
            bold: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.bold, {
                    event: 'bold',
                    title: lang.font.bold
                });
            },
            italic: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.italic, {
                    event: 'italic',
                    title: lang.font.italic
                });
            },
            underline: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.underline, {
                    event: 'underline',
                    title: lang.font.underline
                });
            },
            strikethrough: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.strikethrough, {
                    event: 'strikethrough',
                    title: lang.font.strikethrough
                });
            },
            superscript: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.superscript, {
                    event: 'superscript',
                    title: lang.font.superscript
                });
            },
            subscript: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.subscript, {
                    event: 'subscript',
                    title: lang.font.subscript
                });
            },
            clear: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.font.clear, {
                    event: 'removeFormat',
                    title: lang.font.clear
                });
            },
            ul: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.lists.unordered, {
                    event: 'insertUnorderedList',
                    title: lang.lists.unordered
                });
            },
            ol: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.lists.ordered, {
                    event: 'insertOrderedList',
                    title: lang.lists.ordered
                });
            },
            paragraph: function (lang, options) {
                var leftButton = tplIconButton(options.iconPrefix + options.icons.paragraph.left, {
                    title: lang.paragraph.left,
                    event: 'justifyLeft'
                });
                var centerButton = tplIconButton(options.iconPrefix + options.icons.paragraph.center, {
                    title: lang.paragraph.center,
                    event: 'justifyCenter'
                });
                var rightButton = tplIconButton(options.iconPrefix + options.icons.paragraph.right, {
                    title: lang.paragraph.right,
                    event: 'justifyRight'
                });
                var justifyButton = tplIconButton(options.iconPrefix + options.icons.paragraph.justify, {
                    title: lang.paragraph.justify,
                    event: 'justifyFull'
                });

                var outdentButton = tplIconButton(options.iconPrefix + options.icons.paragraph.outdent, {
                    title: lang.paragraph.outdent,
                    event: 'outdent'
                });
                var indentButton = tplIconButton(options.iconPrefix + options.icons.paragraph.indent, {
                    title: lang.paragraph.indent,
                    event: 'indent'
                });

                var dropdown = [
                    '<div class="note-align btn-group">',
                    leftButton + centerButton + rightButton + justifyButton,
                    '</div><div class="note-list btn-group">',
                    indentButton + outdentButton,
                    '</div>'
                ];

                return tplIconButton(options.iconPrefix + options.icons.paragraph.paragraph, {
                    title: lang.paragraph.paragraph,
                    dropdown: tplDropdown(dropdown, '', 'div')
                });
            },
            height: function (lang, options) {
                var items = options.lineHeights.reduce(function (memo, v) {
                    return memo + '<li><a data-event="lineHeight" href="#" data-value="' + parseFloat(v) + '">' +
                        '<i class="' + options.iconPrefix + options.icons.misc.check + '"></i> ' + v +
                        '</a></li>';
                }, '');

                return tplIconButton(options.iconPrefix + options.icons.font.height, {
                    title: lang.font.height,
                    dropdown: tplDropdown(items, 'note-check')
                });

            },
            help: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.options.help, {
                    event: 'showHelpDialog',
                    title: lang.options.help,
                    hide: true
                });
            },
            fullscreen: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.options.fullscreen, {
                    event: 'fullscreen',
                    title: lang.options.fullscreen
                });
            },
            codeview: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.options.codeview, {
                    event: 'codeview',
                    title: lang.options.codeview
                });
            },
            undo: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.history.undo, {
                    event: 'undo',
                    title: lang.history.undo
                });
            },
            redo: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.history.redo, {
                    event: 'redo',
                    title: lang.history.redo
                });
            },
            hr: function (lang, options) {
                return tplIconButton(options.iconPrefix + options.icons.hr.insert, {
                    event: 'insertHorizontalRule',
                    title: lang.hr.insert
                });
            }
        };

        var tplPopovers = function (lang, options) {
            var tplLinkPopover = function () {
                var linkButton = tplIconButton(options.iconPrefix + options.icons.link.edit, {
                    title: lang.link.edit,
                    event: 'showLinkDialog',
                    hide: true
                });
                var unlinkButton = tplIconButton(options.iconPrefix + options.icons.link.unlink, {
                    title: lang.link.unlink,
                    event: 'unlink'
                });
                var content = '<a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;' +
                    '<div class="note-insert btn-group">' +
                    linkButton + unlinkButton +
                    '</div>';
                return tplPopover('note-link-popover', content);
            };

            var tplImagePopover = function () {
                var fullButton = tplButton('<span class="note-fontsize-10">100%</span>', {
                    title: lang.image.resizeFull,
                    event: 'resize',
                    value: '1'
                });
                var halfButton = tplButton('<span class="note-fontsize-10">50%</span>', {
                    title: lang.image.resizeHalf,
                    event: 'resize',
                    value: '0.5'
                });
                var quarterButton = tplButton('<span class="note-fontsize-10">25%</span>', {
                    title: lang.image.resizeQuarter,
                    event: 'resize',
                    value: '0.25'
                });

                var leftButton = tplIconButton(options.iconPrefix + options.icons.image.floatLeft, {
                    title: lang.image.floatLeft,
                    event: 'floatMe',
                    value: 'left'
                });
                var rightButton = tplIconButton(options.iconPrefix + options.icons.image.floatRight, {
                    title: lang.image.floatRight,
                    event: 'floatMe',
                    value: 'right'
                });
                var justifyButton = tplIconButton(options.iconPrefix + options.icons.image.floatNone, {
                    title: lang.image.floatNone,
                    event: 'floatMe',
                    value: 'none'
                });

                var roundedButton = tplIconButton(options.iconPrefix + options.icons.image.shapeRounded, {
                    title: lang.image.shapeRounded,
                    event: 'imageShape',
                    value: 'img-rounded'
                });
                var circleButton = tplIconButton(options.iconPrefix + options.icons.image.shapeCircle, {
                    title: lang.image.shapeCircle,
                    event: 'imageShape',
                    value: 'img-circle'
                });
                var thumbnailButton = tplIconButton(options.iconPrefix + options.icons.image.shapeThumbnail, {
                    title: lang.image.shapeThumbnail,
                    event: 'imageShape',
                    value: 'img-thumbnail'
                });
                var noneButton = tplIconButton(options.iconPrefix + options.icons.image.shapeNone, {
                    title: lang.image.shapeNone,
                    event: 'imageShape',
                    value: ''
                });

                var removeButton = tplIconButton(options.iconPrefix + options.icons.image.remove, {
                    title: lang.image.remove,
                    event: 'removeMedia',
                    value: 'none'
                });

                var content = (options.disableResizeImage ? '' : '<div class="btn-group">' + fullButton + halfButton + quarterButton + '</div>') +
                    '<div class="btn-group">' + leftButton + rightButton + justifyButton + '</div><br>' +
                    '<div class="btn-group">' + roundedButton + circleButton + thumbnailButton + noneButton + '</div>' +
                    '<div class="btn-group">' + removeButton + '</div>';
                return tplPopover('note-image-popover', content);
            };

            var tplAirPopover = function () {
                var $content = $('<div />');
                for (var idx = 0, len = options.airPopover.length; idx < len; idx++) {
                    var group = options.airPopover[idx];

                    var $group = $('<div class="note-' + group[0] + ' btn-group">');
                    for (var i = 0, lenGroup = group[1].length; i < lenGroup; i++) {
                        var $button = $(tplButtonInfo[group[1][i]](lang, options));

                        $button.attr('data-name', group[1][i]);

                        $group.append($button);
                    }
                    $content.append($group);
                }

                return tplPopover('note-air-popover', $content.children());
            };

            var $notePopover = $('<div class="note-popover" />');

            $notePopover.append(tplLinkPopover());
            $notePopover.append(tplImagePopover());

            if (options.airMode) {
                $notePopover.append(tplAirPopover());
            }

            return $notePopover;
        };

        var tplHandles = function (options) {
            return '<div class="note-handle">' +
                '<div class="note-control-selection">' +
                '<div class="note-control-selection-bg"></div>' +
                '<div class="note-control-holder note-control-nw"></div>' +
                '<div class="note-control-holder note-control-ne"></div>' +
                '<div class="note-control-holder note-control-sw"></div>' +
                '<div class="' +
                (options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing') +
                ' note-control-se"></div>' +
                (options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>') +
                '</div>' +
                '</div>';
        };

        /**
         * shortcut table template
         * @param {String} title
         * @param {String} body
         */
        var tplShortcut = function (title, keys) {
            var keyClass = 'note-shortcut-col col-xs-6 note-shortcut-';
            var body = [];

            for (var i in keys) {
                if (keys.hasOwnProperty(i)) {
                    body.push(
                        '<div class="' + keyClass + 'key">' + keys[i].kbd + '</div>' +
                        '<div class="' + keyClass + 'name">' + keys[i].text + '</div>'
                    );
                }
            }

            return '<div class="note-shortcut-row row"><div class="' + keyClass + 'title col-xs-offset-6">' + title + '</div></div>' +
                '<div class="note-shortcut-row row">' + body.join('</div><div class="note-shortcut-row row">') + '</div>';
        };

        var tplShortcutText = function (lang) {
            var keys = [
                {kbd: '⌘ + B', text: lang.font.bold},
                {kbd: '⌘ + I', text: lang.font.italic},
                {kbd: '⌘ + U', text: lang.font.underline},
                {kbd: '⌘ + \\', text: lang.font.clear}
            ];

            return tplShortcut(lang.shortcut.textFormatting, keys);
        };

        var tplShortcutAction = function (lang) {
            var keys = [
                {kbd: '⌘ + Z', text: lang.history.undo},
                {kbd: '⌘ + ⇧ + Z', text: lang.history.redo},
                {kbd: '⌘ + ]', text: lang.paragraph.indent},
                {kbd: '⌘ + [', text: lang.paragraph.outdent},
                {kbd: '⌘ + ENTER', text: lang.hr.insert}
            ];

            return tplShortcut(lang.shortcut.action, keys);
        };

        var tplShortcutPara = function (lang) {
            var keys = [
                {kbd: '⌘ + ⇧ + L', text: lang.paragraph.left},
                {kbd: '⌘ + ⇧ + E', text: lang.paragraph.center},
                {kbd: '⌘ + ⇧ + R', text: lang.paragraph.right},
                {kbd: '⌘ + ⇧ + J', text: lang.paragraph.justify},
                {kbd: '⌘ + ⇧ + NUM7', text: lang.lists.ordered},
                {kbd: '⌘ + ⇧ + NUM8', text: lang.lists.unordered}
            ];

            return tplShortcut(lang.shortcut.paragraphFormatting, keys);
        };

        var tplShortcutStyle = function (lang) {
            var keys = [
                {kbd: '⌘ + NUM0', text: lang.style.normal},
                {kbd: '⌘ + NUM1', text: lang.style.h1},
                {kbd: '⌘ + NUM2', text: lang.style.h2},
                {kbd: '⌘ + NUM3', text: lang.style.h3},
                {kbd: '⌘ + NUM4', text: lang.style.h4},
                {kbd: '⌘ + NUM5', text: lang.style.h5},
                {kbd: '⌘ + NUM6', text: lang.style.h6}
            ];

            return tplShortcut(lang.shortcut.documentStyle, keys);
        };

        var tplExtraShortcuts = function (lang, options) {
            var extraKeys = options.extraKeys;
            var keys = [];

            for (var key in extraKeys) {
                if (extraKeys.hasOwnProperty(key)) {
                    keys.push({kbd: key, text: extraKeys[key]});
                }
            }

            return tplShortcut(lang.shortcut.extraKeys, keys);
        };

        var tplShortcutTable = function (lang, options) {
            var colClass = 'class="note-shortcut note-shortcut-col col-sm-6 col-xs-12"';
            var template = [
                '<div ' + colClass + '>' + tplShortcutAction(lang, options) + '</div>' +
                '<div ' + colClass + '>' + tplShortcutText(lang, options) + '</div>',
                '<div ' + colClass + '>' + tplShortcutStyle(lang, options) + '</div>' +
                '<div ' + colClass + '>' + tplShortcutPara(lang, options) + '</div>'
            ];

            if (options.extraKeys) {
                template.push('<div ' + colClass + '>' + tplExtraShortcuts(lang, options) + '</div>');
            }

            return '<div class="note-shortcut-row row">' +
                template.join('</div><div class="note-shortcut-row row">') +
                '</div>';
        };

        var replaceMacKeys = function (sHtml) {
            return sHtml.replace(/⌘/g, 'Ctrl').replace(/⇧/g, 'Shift');
        };

        var tplDialogInfo = {
            image: function (lang, options) {
                var imageLimitation = '';
                if (options.maximumImageFileSize) {
                    var unit = Math.floor(Math.log(options.maximumImageFileSize) / Math.log(1024));
                    var readableSize = (options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +
                        ' ' + ' KMGTP'[unit] + 'B';
                    imageLimitation = '<small>' + lang.image.maximumFileSize + ' : ' + readableSize + '</small>';
                }

                var body = '<div class="form-group row note-group-select-from-files">' +
                    '<label>' + lang.image.selectFromFiles + '</label>' +
                    '<input class="note-image-input form-control" type="file" name="files" accept="image/*" multiple="multiple" />' +
                    imageLimitation +
                    '</div>' +
                    '<div class="form-group row">' +
                    '<label>' + lang.image.url + '</label>' +
                    '<input class="note-image-url form-control col-md-12" type="text" />' +
                    '</div>';
                var footer = '<button href="#" class="btn btn-primary note-image-btn disabled" disabled>' + lang.image.insert + '</button>';
                return tplDialog('note-image-dialog', lang.image.insert, body, footer);
            },

            link: function (lang, options) {
                var body = '<div class="form-group row">' +
                    '<label>' + lang.link.textToDisplay + '</label>' +
                    '<input class="note-link-text form-control col-md-12" type="text" />' +
                    '</div>' +
                    '<div class="form-group row">' +
                    '<label>' + lang.link.url + '</label>' +
                    '<input class="note-link-url form-control col-md-12" type="text" value="http://" />' +
                    '</div>' +
                    (!options.disableLinkTarget ?
                        '<div class="checkbox">' +
                        '<label>' + '<input type="checkbox" checked> ' +
                        lang.link.openInNewWindow +
                        '</label>' +
                        '</div>' : ''
                    );
                var footer = '<button href="#" class="btn btn-primary note-link-btn disabled" disabled>' + lang.link.insert + '</button>';
                return tplDialog('note-link-dialog', lang.link.insert, body, footer);
            },

            help: function (lang, options) {
                var body = '<a class="modal-close pull-right" aria-hidden="true" tabindex="-1">' + lang.shortcut.close + '</a>' +
                    '<div class="title">' + lang.shortcut.shortcuts + '</div>' +
                    (agent.isMac ? tplShortcutTable(lang, options) : replaceMacKeys(tplShortcutTable(lang, options))) +
                    '<p class="text-center">' +
                    '<a href="//summernote.org/" target="_blank">Summernote 0.6.16</a> · ' +
                    '<a href="//github.com/summernote/summernote" target="_blank">Project</a> · ' +
                    '<a href="//github.com/summernote/summernote/issues" target="_blank">Issues</a>' +
                    '</p>';
                return tplDialog('note-help-dialog', '', body, '');
            }
        };

        var tplDialogs = function (lang, options) {
            var dialogs = '';

            $.each(tplDialogInfo, function (idx, tplDialog) {
                dialogs += tplDialog(lang, options);
            });

            return '<div class="note-dialog">' + dialogs + '</div>';
        };

        var tplStatusbar = function () {
            return '<div class="note-resizebar">' +
                '<div class="note-icon-bar"></div>' +
                '<div class="note-icon-bar"></div>' +
                '<div class="note-icon-bar"></div>' +
                '</div>';
        };

        var representShortcut = function (str) {
            if (agent.isMac) {
                str = str.replace('CMD', '⌘').replace('SHIFT', '⇧');
            }

            return str.replace('BACKSLASH', '\\')
                .replace('SLASH', '/')
                .replace('LEFTBRACKET', '[')
                .replace('RIGHTBRACKET', ']');
        };

        /**
         * createTooltip
         *
         * @param {jQuery} $container
         * @param {Object} keyMap
         * @param {String} [sPlacement]
         */
        var createTooltip = function ($container, keyMap, sPlacement) {
            var invertedKeyMap = func.invertObject(keyMap);
            var $buttons = $container.find('button');

            $buttons.each(function (i, elBtn) {
                var $btn = $(elBtn);
                var sShortcut = invertedKeyMap[$btn.data('event')];
                if (sShortcut) {
                    $btn.attr('title', function (i, v) {
                        return v + ' (' + representShortcut(sShortcut) + ')';
                    });
                }
                // bootstrap tooltip on btn-group bug
                // https://github.com/twbs/bootstrap/issues/5687
            }).tooltip({
                container: 'body',
                trigger: 'hover',
                placement: sPlacement || 'top'
            }).on('click', function () {
                $(this).tooltip('hide');
            });
        };

        // createPalette
        var createPalette = function ($container, options) {
            var colorInfo = options.colors;
            $container.find('.note-color-palette').each(function () {
                var $palette = $(this), eventName = $palette.attr('data-target-event');
                var paletteContents = [];
                for (var row = 0, lenRow = colorInfo.length; row < lenRow; row++) {
                    var colors = colorInfo[row];
                    var buttons = [];
                    for (var col = 0, lenCol = colors.length; col < lenCol; col++) {
                        var color = colors[col];
                        buttons.push(['<button type="button" class="note-color-btn" style="background-color:', color,
                            ';" data-event="', eventName,
                            '" data-value="', color,
                            '" title="', color,
                            '" data-toggle="button" tabindex="-1"></button>'].join(''));
                    }
                    paletteContents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
                }
                $palette.html(paletteContents.join(''));
            });
        };

        /**
         * create summernote layout (air mode)
         *
         * @param {jQuery} $holder
         * @param {Object} options
         */
        this.createLayoutByAirMode = function ($holder, options) {
            var langInfo = options.langInfo;
            var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];
            var id = func.uniqueId();

            $holder.addClass('note-air-editor note-editable panel-body');
            $holder.attr({
                'id': 'note-editor-' + id,
                'contentEditable': true
            });

            var body = document.body;

            // create Popover
            var $popover = $(tplPopovers(langInfo, options));
            $popover.addClass('note-air-layout');
            $popover.attr('id', 'note-popover-' + id);
            $popover.appendTo(body);
            createTooltip($popover, keyMap);
            createPalette($popover, options);

            // create Handle
            var $handle = $(tplHandles(options));
            $handle.addClass('note-air-layout');
            $handle.attr('id', 'note-handle-' + id);
            $handle.appendTo(body);

            // create Dialog
            var $dialog = $(tplDialogs(langInfo, options));
            $dialog.addClass('note-air-layout');
            $dialog.attr('id', 'note-dialog-' + id);
            $dialog.find('button.close, a.modal-close').click(function () {
                $(this).closest('.modal').modal('hide');
            });
            $dialog.appendTo(body);
        };

        /**
         * create summernote layout (normal mode)
         *
         * @param {jQuery} $holder
         * @param {Object} options
         */
        this.createLayoutByFrame = function ($holder, options) {
            var langInfo = options.langInfo;

            //01. create Editor
            var $editor = $('<div class="note-editor panel panel-default" />');
            if (options.width) {
                $editor.width(options.width);
            }

            //02. statusbar (resizebar)
            if (options.height > 0) {
                $('<div class="note-statusbar">' + (options.disableResizeEditor ? '' : tplStatusbar()) + '</div>').prependTo($editor);
            }

            //03 editing area
            var $editingArea = $('<div class="note-editing-area" />');
            //03. create editable
            var isContentEditable = !$holder.is(':disabled');
            var $editable = $('<div class="note-editable panel-body" contentEditable="' + isContentEditable + '"></div>').prependTo($editingArea);

            if (options.height) {
                $editable.height(options.height);
            }
            if (options.direction) {
                $editable.attr('dir', options.direction);
            }
            var placeholder = $holder.attr('placeholder') || options.placeholder;
            if (placeholder) {
                $editable.attr('data-placeholder', placeholder);
            }

            $editable.html(dom.html($holder) || dom.emptyPara);

            //031. create codable
            $('<textarea class="note-codable"></textarea>').prependTo($editingArea);

            //04. create Popover
            var $popover = $(tplPopovers(langInfo, options)).prependTo($editingArea);
            createPalette($popover, options);
            createTooltip($popover, keyMap);

            //05. handle(control selection, ...)
            $(tplHandles(options)).prependTo($editingArea);

            $editingArea.prependTo($editor);

            //06. create Toolbar
            var $toolbar = $('<div class="note-toolbar panel-heading" />');
            for (var idx = 0, len = options.toolbar.length; idx < len; idx++) {
                var groupName = options.toolbar[idx][0];
                var groupButtons = options.toolbar[idx][1];

                var $group = $('<div class="note-' + groupName + ' btn-group" />');
                for (var i = 0, btnLength = groupButtons.length; i < btnLength; i++) {
                    var buttonInfo = tplButtonInfo[groupButtons[i]];
                    // continue creating toolbar even if a button doesn't exist
                    if (!$.isFunction(buttonInfo)) {
                        continue;
                    }

                    var $button = $(buttonInfo(langInfo, options));
                    $button.attr('data-name', groupButtons[i]);  // set button's alias, becuase to get button element from $toolbar
                    $group.append($button);
                }
                $toolbar.append($group);
            }

            var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];
            createPalette($toolbar, options);
            createTooltip($toolbar, keyMap, 'bottom');
            $toolbar.prependTo($editor);

            //07. create Dropzone
            $('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo($editor);

            //08. create Dialog
            var $dialogContainer = options.dialogsInBody ? $(document.body) : $editor;
            var $dialog = $(tplDialogs(langInfo, options)).prependTo($dialogContainer);
            $dialog.find('button.close, a.modal-close').click(function () {
                $(this).closest('.modal').modal('hide');
            });

            //09. Editor/Holder switch
            $editor.insertAfter($holder);
            $holder.hide();
        };

        this.hasNoteEditor = function ($holder) {
            return this.noteEditorFromHolder($holder).length > 0;
        };

        this.noteEditorFromHolder = function ($holder) {
            if ($holder.hasClass('note-air-editor')) {
                return $holder;
            } else if ($holder.next().hasClass('note-editor')) {
                return $holder.next();
            } else {
                return $();
            }
        };

        /**
         * create summernote layout
         *
         * @param {jQuery} $holder
         * @param {Object} options
         */
        this.createLayout = function ($holder, options) {
            if (options.airMode) {
                this.createLayoutByAirMode($holder, options);
            } else {
                this.createLayoutByFrame($holder, options);
            }
        };

        /**
         * returns layoutInfo from holder
         *
         * @param {jQuery} $holder - placeholder
         * @return {Object}
         */
        this.layoutInfoFromHolder = function ($holder) {
            var $editor = this.noteEditorFromHolder($holder);
            if (!$editor.length) {
                return;
            }

            // connect $holder to $editor
            $editor.data('holder', $holder);

            return dom.buildLayoutInfo($editor);
        };

        /**
         * removeLayout
         *
         * @param {jQuery} $holder - placeholder
         * @param {Object} layoutInfo
         * @param {Object} options
         *
         */
        this.removeLayout = function ($holder, layoutInfo, options) {
            if (options.airMode) {
                $holder.removeClass('note-air-editor note-editable')
                    .removeAttr('id contentEditable');

                layoutInfo.popover().remove();
                layoutInfo.handle().remove();
                layoutInfo.dialog().remove();
            } else {
                $holder.html(layoutInfo.editable().html());

                if (options.dialogsInBody) {
                    layoutInfo.dialog().remove();
                }
                layoutInfo.editor().remove();
                $holder.show();
            }
        };

        /**
         *
         * @return {Object}
         * @return {function(label, options=):string} return.button {@link #tplButton function to make text button}
         * @return {function(iconClass, options=):string} return.iconButton {@link #tplIconButton function to make icon button}
         * @return {function(className, title=, body=, footer=):string} return.dialog {@link #tplDialog function to make dialog}
         */
        this.getTemplate = function () {
            return {
                button: tplButton,
                iconButton: tplIconButton,
                dialog: tplDialog
            };
        };

        /**
         * add button information
         *
         * @param {String} name button name
         * @param {Function} buttonInfo function to make button, reference to {@link #tplButton},{@link #tplIconButton}
         */
        this.addButtonInfo = function (name, buttonInfo) {
            tplButtonInfo[name] = buttonInfo;
        };

        /**
         *
         * @param {String} name
         * @param {Function} dialogInfo function to make dialog, reference to {@link #tplDialog}
         */
        this.addDialogInfo = function (name, dialogInfo) {
            tplDialogInfo[name] = dialogInfo;
        };
    };


    // jQuery namespace for summernote
    /**
     * @class $.summernote
     *
     * summernote attribute
     *
     * @mixin defaults
     * @singleton
     *
     */
    $.summernote = $.summernote || {};

    // extends default settings
    //  - $.summernote.version
    //  - $.summernote.options
    //  - $.summernote.lang
    $.extend($.summernote, defaults);

    var renderer = new Renderer();
    var eventHandler = new EventHandler();

    $.extend($.summernote, {
        /** @property {Renderer} */
        renderer: renderer,
        /** @property {EventHandler} */
        eventHandler: eventHandler,
        /**
         * @property {Object} core
         * @property {core.agent} core.agent
         * @property {core.dom} core.dom
         * @property {core.range} core.range
         */
        core: {
            agent: agent,
            list: list,
            dom: dom,
            range: range
        },
        /**
         * @property {Object}
         * pluginEvents event list for plugins
         * event has name and callback function.
         *
         * ```
         * $.summernote.addPlugin({
     *     events : {
     *          'hello' : function(layoutInfo, value, $target) {
     *              console.log('event name is hello, value is ' + value );
     *          }
     *     }     
     * })
         * ```
         *
         * * event name is data-event property.
         * * layoutInfo is a summernote layout information.
         * * value is data-value property.
         */
        pluginEvents: {},

        plugins: []
    });

    /**
     * @method addPlugin
     *
     * add Plugin in Summernote
     *
     * Summernote can make a own plugin.
     *
     * ### Define plugin
     * ```
     * // get template function
     * var tmpl = $.summernote.renderer.getTemplate();
     *
     * // add a button
     * $.summernote.addPlugin({
   *     buttons : {
   *        // "hello"  is button's namespace.      
   *        "hello" : function(lang, options) {
   *            // make icon button by template function          
   *            return tmpl.iconButton(options.iconPrefix + 'header', {
   *                // callback function name when button clicked 
   *                event : 'hello',
   *                // set data-value property                 
   *                value : 'hello',                
   *                hide : true
   *            });           
   *        }
   *     
   *     }, 
   *     
   *     events : {
   *        "hello" : function(layoutInfo, value) {
   *            // here is event code 
   *        }
   *     }     
   * });
     * ```
     * ### Use a plugin in toolbar
     *
     * ```
     *    $("#editor").summernote({
   *    ...
   *    toolbar : [
   *        // display hello plugin in toolbar     
   *        ['group', [ 'hello' ]]
   *    ]
   *    ...    
   *    });
     * ```
     *
     *
     * @param {Object} plugin
     * @param {Object} [plugin.buttons] define plugin button. for detail, see to Renderer.addButtonInfo
     * @param {Object} [plugin.dialogs] define plugin dialog. for detail, see to Renderer.addDialogInfo
     * @param {Object} [plugin.events] add event in $.summernote.pluginEvents
     * @param {Object} [plugin.langs] update $.summernote.lang
     * @param {Object} [plugin.options] update $.summernote.options
     */
    $.summernote.addPlugin = function (plugin) {

        // save plugin list
        $.summernote.plugins.push(plugin);

        if (plugin.buttons) {
            $.each(plugin.buttons, function (name, button) {
                renderer.addButtonInfo(name, button);
            });
        }

        if (plugin.dialogs) {
            $.each(plugin.dialogs, function (name, dialog) {
                renderer.addDialogInfo(name, dialog);
            });
        }

        if (plugin.events) {
            $.each(plugin.events, function (name, event) {
                $.summernote.pluginEvents[name] = event;
            });
        }

        if (plugin.langs) {
            $.each(plugin.langs, function (locale, lang) {
                if ($.summernote.lang[locale]) {
                    $.extend($.summernote.lang[locale], lang);
                }
            });
        }

        if (plugin.options) {
            $.extend($.summernote.options, plugin.options);
        }
    };

    /*
     * extend $.fn
     */
    $.fn.extend({
        /**
         * @method
         * Initialize summernote
         *  - create editor layout and attach Mouse and keyboard events.
         *
         * ```
         * $("#summernote").summernote( { options ..} );
         * ```
         *
         * @member $.fn
         * @param {Object|String} options reference to $.summernote.options
         * @return {this}
         */
        summernote: function () {
            // check first argument's type
            //  - {String}: External API call {{module}}.{{method}}
            //  - {Object}: init options
            var type = $.type(list.head(arguments));
            var isExternalAPICalled = type === 'string';
            var hasInitOptions = type === 'object';

            // extend default options with custom user options
            var options = hasInitOptions ? list.head(arguments) : {};

            options = $.extend({}, $.summernote.options, options);
            options.icons = $.extend({}, $.summernote.options.icons, options.icons);

            // Include langInfo in options for later use, e.g. for image drag-n-drop
            // Setup language info with en-US as default
            options.langInfo = $.extend(true, {}, $.summernote.lang['en-US'], $.summernote.lang[options.lang]);

            // override plugin options
            if (!isExternalAPICalled && hasInitOptions) {
                for (var i = 0, len = $.summernote.plugins.length; i < len; i++) {
                    var plugin = $.summernote.plugins[i];

                    if (options.plugin[plugin.name]) {
                        $.summernote.plugins[i] = $.extend(true, plugin, options.plugin[plugin.name]);
                    }
                }
            }

            this.each(function (idx, holder) {
                var $holder = $(holder);

                // if layout isn't created yet, createLayout and attach events
                if (!renderer.hasNoteEditor($holder)) {
                    renderer.createLayout($holder, options);

                    var layoutInfo = renderer.layoutInfoFromHolder($holder);
                    $holder.data('layoutInfo', layoutInfo);

                    eventHandler.attach(layoutInfo, options);
                    eventHandler.attachCustomEvent(layoutInfo, options);
                }
            });

            var $first = this.first();
            if ($first.length) {
                var layoutInfo = renderer.layoutInfoFromHolder($first);

                // external API
                if (isExternalAPICalled) {
                    var moduleAndMethod = list.head(list.from(arguments));
                    var args = list.tail(list.from(arguments));

                    // TODO now external API only works for editor
                    var params = [moduleAndMethod, layoutInfo.editable()].concat(args);
                    return eventHandler.invoke.apply(eventHandler, params);
                } else if (options.focus) {
                    // focus on first editable element for initialize editor
                    layoutInfo.editable().focus();
                }
            }

            return this;
        },

        /**
         * @method
         *
         * get the HTML contents of note or set the HTML contents of note.
         *
         * * get contents
         * ```
         * var content = $("#summernote").code();
         * ```
         * * set contents
         *
         * ```
         * $("#summernote").code(html);
         * ```
         *
         * @member $.fn
         * @param {String} [html] - HTML contents(optional, set)
         * @return {this|String} - context(set) or HTML contents of note(get).
         */
        code: function (html) {
            // get the HTML contents of note
            if (html === undefined) {
                var $holder = this.first();
                if (!$holder.length) {
                    return;
                }

                var layoutInfo = renderer.layoutInfoFromHolder($holder);
                var $editable = layoutInfo && layoutInfo.editable();

                if ($editable && $editable.length) {
                    var isCodeview = eventHandler.invoke('codeview.isActivated', layoutInfo);
                    eventHandler.invoke('codeview.sync', layoutInfo);
                    return isCodeview ? layoutInfo.codable().val() :
                        layoutInfo.editable().html();
                }
                return dom.value($holder);
            }

            // set the HTML contents of note
            this.each(function (i, holder) {
                var layoutInfo = renderer.layoutInfoFromHolder($(holder));
                var $editable = layoutInfo && layoutInfo.editable();
                if ($editable) {
                    $editable.html(html);
                }
            });

            return this;
        },

        /**
         * @method
         *
         * destroy Editor Layout and detach Key and Mouse Event
         *
         * @member $.fn
         * @return {this}
         */
        destroy: function () {
            this.each(function (idx, holder) {
                var $holder = $(holder);

                if (!renderer.hasNoteEditor($holder)) {
                    return;
                }

                var info = renderer.layoutInfoFromHolder($holder);
                var options = info.editor().data('options');

                eventHandler.detach(info, options);
                renderer.removeLayout($holder, info, options);
            });

            return this;
        }
    });
}));

/*! X-editable - v1.5.0 
 * In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery
 * http://github.com/vitalets/x-editable
 * Copyright (c) 2013 Vitaliy Potapov; Licensed MIT */
!function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = a.extend({}, a.fn.editableform.defaults, c), this.$div = a(b), this.options.scope || (this.options.scope = this)
    };
    b.prototype = {
        constructor: b, initInput: function () {
            this.input = this.options.input, this.value = this.input.str2value(this.options.value), this.input.prerender()
        }, initTemplate: function () {
            this.$form = a(a.fn.editableform.template)
        }, initButtons: function () {
            var b = this.$form.find(".editable-buttons");
            b.append(a.fn.editableform.buttons), "bottom" === this.options.showbuttons && b.addClass("editable-buttons-bottom")
        }, render: function () {
            this.$loading = a(a.fn.editableform.loading), this.$div.empty().append(this.$loading), this.initTemplate(), this.options.showbuttons ? this.initButtons() : this.$form.find(".editable-buttons").remove(), this.showLoading(), this.isSaving = !1, this.$div.triggerHandler("rendering"), this.initInput(), this.$form.find("div.editable-input").append(this.input.$tpl), this.$div.append(this.$form), a.when(this.input.render()).then(a.proxy(function () {
                if (this.options.showbuttons || this.input.autosubmit(), this.$form.find(".editable-cancel").click(a.proxy(this.cancel, this)), this.input.error)this.error(this.input.error), this.$form.find(".editable-submit").attr("disabled", !0), this.input.$input.attr("disabled", !0), this.$form.submit(function (a) {
                    a.preventDefault()
                }); else {
                    this.error(!1), this.input.$input.removeAttr("disabled"), this.$form.find(".editable-submit").removeAttr("disabled");
                    var b = null === this.value || void 0 === this.value || "" === this.value ? this.options.defaultValue : this.value;
                    this.input.value2input(b), this.$form.submit(a.proxy(this.submit, this))
                }
                this.$div.triggerHandler("rendered"), this.showForm(), this.input.postrender && this.input.postrender()
            }, this))
        }, cancel: function () {
            this.$div.triggerHandler("cancel")
        }, showLoading: function () {
            var a, b;
            this.$form ? (a = this.$form.outerWidth(), b = this.$form.outerHeight(), a && this.$loading.width(a), b && this.$loading.height(b), this.$form.hide()) : (a = this.$loading.parent().width(), a && this.$loading.width(a)), this.$loading.show()
        }, showForm: function (a) {
            this.$loading.hide(), this.$form.show(), a !== !1 && this.input.activate(), this.$div.triggerHandler("show")
        }, error: function (b) {
            var c, d = this.$form.find(".control-group"), e = this.$form.find(".editable-error-block");
            if (b === !1)d.removeClass(a.fn.editableform.errorGroupClass), e.removeClass(a.fn.editableform.errorBlockClass).empty().hide(); else {
                if (b) {
                    c = b.split("\n");
                    for (var f = 0; f < c.length; f++)c[f] = a("<div>").text(c[f]).html();
                    b = c.join("<br>")
                }
                d.addClass(a.fn.editableform.errorGroupClass), e.addClass(a.fn.editableform.errorBlockClass).html(b).show()
            }
        }, submit: function (b) {
            b.stopPropagation(), b.preventDefault();
            var c, d = this.input.input2value();
            if (c = this.validate(d))return this.error(c), this.showForm(), void 0;
            if (!this.options.savenochange && this.input.value2str(d) == this.input.value2str(this.value))return this.$div.triggerHandler("nochange"), void 0;
            var e = this.input.value2submit(d);
            this.isSaving = !0, a.when(this.save(e)).done(a.proxy(function (a) {
                this.isSaving = !1;
                var b = "function" == typeof this.options.success ? this.options.success.call(this.options.scope, a, d) : null;
                return b === !1 ? (this.error(!1), this.showForm(!1), void 0) : "string" == typeof b ? (this.error(b), this.showForm(), void 0) : (b && "object" == typeof b && b.hasOwnProperty("newValue") && (d = b.newValue), this.error(!1), this.value = d, this.$div.triggerHandler("save", {
                    newValue: d,
                    submitValue: e,
                    response: a
                }), void 0)
            }, this)).fail(a.proxy(function (a) {
                this.isSaving = !1;
                var b;
                b = "function" == typeof this.options.error ? this.options.error.call(this.options.scope, a, d) : "string" == typeof a ? a : a.responseText || a.statusText || "Unknown error!", this.error(b), this.showForm()
            }, this))
        }, save: function (b) {
            this.options.pk = a.fn.editableutils.tryParseJson(this.options.pk, !0);
            var c, d = "function" == typeof this.options.pk ? this.options.pk.call(this.options.scope) : this.options.pk, e = !!("function" == typeof this.options.url || this.options.url && ("always" === this.options.send || "auto" === this.options.send && null !== d && void 0 !== d));
            return e ? (this.showLoading(), c = {
                name: this.options.name || "",
                value: b,
                pk: d
            }, "function" == typeof this.options.params ? c = this.options.params.call(this.options.scope, c) : (this.options.params = a.fn.editableutils.tryParseJson(this.options.params, !0), a.extend(c, this.options.params)), "function" == typeof this.options.url ? this.options.url.call(this.options.scope, c) : a.ajax(a.extend({
                url: this.options.url,
                data: c,
                type: "POST"
            }, this.options.ajaxOptions))) : void 0
        }, validate: function (a) {
            return void 0 === a && (a = this.value), "function" == typeof this.options.validate ? this.options.validate.call(this.options.scope, a) : void 0
        }, option: function (a, b) {
            a in this.options && (this.options[a] = b), "value" === a && this.setValue(b)
        }, setValue: function (a, b) {
            this.value = b ? this.input.str2value(a) : a, this.$form && this.$form.is(":visible") && this.input.value2input(this.value)
        }
    }, a.fn.editableform = function (c) {
        var d = arguments;
        return this.each(function () {
            var e = a(this), f = e.data("editableform"), g = "object" == typeof c && c;
            f || e.data("editableform", f = new b(this, g)), "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
        })
    }, a.fn.editableform.Constructor = b, a.fn.editableform.defaults = {
        type: "text",
        url: null,
        params: null,
        name: null,
        pk: null,
        value: null,
        defaultValue: null,
        send: "auto",
        validate: null,
        success: null,
        error: null,
        ajaxOptions: null,
        showbuttons: !0,
        scope: null,
        savenochange: !1
    }, a.fn.editableform.template = '<form class="form-inline editableform"><div class="control-group"><div><div class="editable-input"></div><div class="editable-buttons"></div></div><div class="editable-error-block"></div></div></form>', a.fn.editableform.loading = '<div class="editableform-loading"></div>', a.fn.editableform.buttons = '<button type="submit" class="editable-submit">ok</button><button type="button" class="editable-cancel">cancel</button>', a.fn.editableform.errorGroupClass = null, a.fn.editableform.errorBlockClass = "editable-error", a.fn.editableform.engine = "jquery"
}(window.jQuery), function (a) {
    "use strict";
    a.fn.editableutils = {
        inherit: function (a, b) {
            var c = function () {
            };
            c.prototype = b.prototype, a.prototype = new c, a.prototype.constructor = a, a.superclass = b.prototype
        }, setCursorPosition: function (a, b) {
            if (a.setSelectionRange)a.setSelectionRange(b, b); else if (a.createTextRange) {
                var c = a.createTextRange();
                c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", b), c.select()
            }
        }, tryParseJson: function (a, b) {
            if ("string" == typeof a && a.length && a.match(/^[\{\[].*[\}\]]$/))if (b)try {
                a = new Function("return " + a)()
            } catch (c) {
            } finally {
                return a
            } else a = new Function("return " + a)();
            return a
        }, sliceObj: function (b, c, d) {
            var e, f, g = {};
            if (!a.isArray(c) || !c.length)return g;
            for (var h = 0; h < c.length; h++)e = c[h], b.hasOwnProperty(e) && (g[e] = b[e]), d !== !0 && (f = e.toLowerCase(), b.hasOwnProperty(f) && (g[e] = b[f]));
            return g
        }, getConfigData: function (b) {
            var c = {};
            return a.each(b.data(), function (a, b) {
                ("object" != typeof b || b && "object" == typeof b && (b.constructor === Object || b.constructor === Array)) && (c[a] = b)
            }), c
        }, objectKeys: function (a) {
            if (Object.keys)return Object.keys(a);
            if (a !== Object(a))throw new TypeError("Object.keys called on a non-object");
            var b, c = [];
            for (b in a)Object.prototype.hasOwnProperty.call(a, b) && c.push(b);
            return c
        }, escape: function (b) {
            return a("<div>").text(b).html()
        }, itemsByValue: function (b, c, d) {
            if (!c || null === b)return [];
            if ("function" != typeof d) {
                var e = d || "value";
                d = function (a) {
                    return a[e]
                }
            }
            var f = a.isArray(b), g = [], h = this;
            return a.each(c, function (c, e) {
                if (e.children)g = g.concat(h.itemsByValue(b, e.children, d)); else if (f)a.grep(b, function (a) {
                    return a == (e && "object" == typeof e ? d(e) : e)
                }).length && g.push(e); else {
                    var i = e && "object" == typeof e ? d(e) : e;
                    b == i && g.push(e)
                }
            }), g
        }, createInput: function (b) {
            var c, d, e, f = b.type;
            return "date" === f && ("inline" === b.mode ? a.fn.editabletypes.datefield ? f = "datefield" : a.fn.editabletypes.dateuifield && (f = "dateuifield") : a.fn.editabletypes.date ? f = "date" : a.fn.editabletypes.dateui && (f = "dateui"), "date" !== f || a.fn.editabletypes.date || (f = "combodate")), "datetime" === f && "inline" === b.mode && (f = "datetimefield"), "wysihtml5" !== f || a.fn.editabletypes[f] || (f = "textarea"), "function" == typeof a.fn.editabletypes[f] ? (c = a.fn.editabletypes[f], d = this.sliceObj(b, this.objectKeys(c.defaults)), e = new c(d)) : (a.error("Unknown type: " + f), !1)
        }, supportsTransitions: function () {
            var a = document.body || document.documentElement, b = a.style, c = "transition", d = ["Moz", "Webkit", "Khtml", "O", "ms"];
            if ("string" == typeof b[c])return !0;
            c = c.charAt(0).toUpperCase() + c.substr(1);
            for (var e = 0; e < d.length; e++)if ("string" == typeof b[d[e] + c])return !0;
            return !1
        }
    }
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a, b) {
        this.init(a, b)
    }, c = function (a, b) {
        this.init(a, b)
    };
    b.prototype = {
        containerName: null, containerDataName: null, innerCss: null, containerClass: "editable-container editable-popup", defaults: {}, init: function (c, d) {
            this.$element = a(c), this.options = a.extend({}, a.fn.editableContainer.defaults, d), this.splitOptions(), this.formOptions.scope = this.$element[0], this.initContainer(), this.delayedHide = !1, this.$element.on("destroyed", a.proxy(function () {
                this.destroy()
            }, this)), a(document).data("editable-handlers-attached") || (a(document).on("keyup.editable", function (b) {
                27 === b.which && a(".editable-open").editableContainer("hide")
            }), a(document).on("click.editable", function (c) {
                var d, e = a(c.target), f = [".editable-container", ".ui-datepicker-header", ".datepicker", ".modal-backdrop", ".bootstrap-wysihtml5-insert-image-modal", ".bootstrap-wysihtml5-insert-link-modal"];
                if (a.contains(document.documentElement, c.target) && !e.is(document)) {
                    for (d = 0; d < f.length; d++)if (e.is(f[d]) || e.parents(f[d]).length)return;
                    b.prototype.closeOthers(c.target)
                }
            }), a(document).data("editable-handlers-attached", !0))
        }, splitOptions: function () {
            if (this.containerOptions = {}, this.formOptions = {}, !a.fn[this.containerName])throw new Error(this.containerName + " not found. Have you included corresponding js file?");
            for (var b in this.options)b in this.defaults ? this.containerOptions[b] = this.options[b] : this.formOptions[b] = this.options[b]
        }, tip: function () {
            return this.container() ? this.container().$tip : null
        }, container: function () {
            var a;
            return this.containerDataName && (a = this.$element.data(this.containerDataName)) ? a : a = this.$element.data(this.containerName)
        }, call: function () {
            this.$element[this.containerName].apply(this.$element, arguments)
        }, initContainer: function () {
            this.call(this.containerOptions)
        }, renderForm: function () {
            this.$form.editableform(this.formOptions).on({
                save: a.proxy(this.save, this), nochange: a.proxy(function () {
                    this.hide("nochange")
                }, this), cancel: a.proxy(function () {
                    this.hide("cancel")
                }, this), show: a.proxy(function () {
                    this.delayedHide ? (this.hide(this.delayedHide.reason), this.delayedHide = !1) : this.setPosition()
                }, this), rendering: a.proxy(this.setPosition, this), resize: a.proxy(this.setPosition, this), rendered: a.proxy(function () {
                    this.$element.triggerHandler("shown", a(this.options.scope).data("editable"))
                }, this)
            }).editableform("render")
        }, show: function (b) {
            this.$element.addClass("editable-open"), b !== !1 && this.closeOthers(this.$element[0]), this.innerShow(), this.tip().addClass(this.containerClass), this.$form, this.$form = a("<div>"), this.tip().is(this.innerCss) ? this.tip().append(this.$form) : this.tip().find(this.innerCss).append(this.$form), this.renderForm()
        }, hide: function (a) {
            if (this.tip() && this.tip().is(":visible") && this.$element.hasClass("editable-open")) {
                if (this.$form.data("editableform").isSaving)return this.delayedHide = {reason: a}, void 0;
                this.delayedHide = !1, this.$element.removeClass("editable-open"), this.innerHide(), this.$element.triggerHandler("hidden", a || "manual")
            }
        }, innerShow: function () {
        }, innerHide: function () {
        }, toggle: function (a) {
            this.container() && this.tip() && this.tip().is(":visible") ? this.hide() : this.show(a)
        }, setPosition: function () {
        }, save: function (a, b) {
            this.$element.triggerHandler("save", b), this.hide("save")
        }, option: function (a, b) {
            this.options[a] = b, a in this.containerOptions ? (this.containerOptions[a] = b, this.setContainerOption(a, b)) : (this.formOptions[a] = b, this.$form && this.$form.editableform("option", a, b))
        }, setContainerOption: function (a, b) {
            this.call("option", a, b)
        }, destroy: function () {
            this.hide(), this.innerDestroy(), this.$element.off("destroyed"), this.$element.removeData("editableContainer")
        }, innerDestroy: function () {
        }, closeOthers: function (b) {
            a(".editable-open").each(function (c, d) {
                if (d !== b && !a(d).find(b).length) {
                    var e = a(d), f = e.data("editableContainer");
                    f && ("cancel" === f.options.onblur ? e.data("editableContainer").hide("onblur") : "submit" === f.options.onblur && e.data("editableContainer").tip().find("form").submit())
                }
            })
        }, activate: function () {
            this.tip && this.tip().is(":visible") && this.$form && this.$form.data("editableform").input.activate()
        }
    }, a.fn.editableContainer = function (d) {
        var e = arguments;
        return this.each(function () {
            var f = a(this), g = "editableContainer", h = f.data(g), i = "object" == typeof d && d, j = "inline" === i.mode ? c : b;
            h || f.data(g, h = new j(this, i)), "string" == typeof d && h[d].apply(h, Array.prototype.slice.call(e, 1))
        })
    }, a.fn.editableContainer.Popup = b, a.fn.editableContainer.Inline = c, a.fn.editableContainer.defaults = {
        value: null,
        placement: "top",
        autohide: !0,
        onblur: "cancel",
        anim: !1,
        mode: "popup"
    }, jQuery.event.special.destroyed = {
        remove: function (a) {
            a.handler && a.handler()
        }
    }
}(window.jQuery), function (a) {
    "use strict";
    a.extend(a.fn.editableContainer.Inline.prototype, a.fn.editableContainer.Popup.prototype, {
        containerName: "editableform",
        innerCss: ".editable-inline",
        containerClass: "editable-container editable-inline",
        initContainer: function () {
            this.$tip = a("<span></span>"), this.options.anim || (this.options.anim = 0)
        },
        splitOptions: function () {
            this.containerOptions = {}, this.formOptions = this.options
        },
        tip: function () {
            return this.$tip
        },
        innerShow: function () {
            this.$element.hide(), this.tip().insertAfter(this.$element).show()
        },
        innerHide: function () {
            this.$tip.hide(this.options.anim, a.proxy(function () {
                this.$element.show(), this.innerDestroy()
            }, this))
        },
        innerDestroy: function () {
            this.tip() && this.tip().empty().remove()
        }
    })
}(window.jQuery), function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.editable.defaults, c, a.fn.editableutils.getConfigData(this.$element)), this.options.selector ? this.initLive() : this.init(), this.options.highlight && !a.fn.editableutils.supportsTransitions() && (this.options.highlight = !1)
    };
    b.prototype = {
        constructor: b, init: function () {
            var b, c = !1;
            if (this.options.name = this.options.name || this.$element.attr("id"), this.options.scope = this.$element[0], this.input = a.fn.editableutils.createInput(this.options), this.input) {
                switch (void 0 === this.options.value || null === this.options.value ? (this.value = this.input.html2value(a.trim(this.$element.html())), c = !0) : (this.options.value = a.fn.editableutils.tryParseJson(this.options.value, !0), this.value = "string" == typeof this.options.value ? this.input.str2value(this.options.value) : this.options.value), this.$element.addClass("editable"), "textarea" === this.input.type && this.$element.addClass("editable-pre-wrapped"), "manual" !== this.options.toggle ? (this.$element.addClass("editable-click"), this.$element.on(this.options.toggle + ".editable", a.proxy(function (a) {
                    if (this.options.disabled || a.preventDefault(), "mouseenter" === this.options.toggle)this.show(); else {
                        var b = "click" !== this.options.toggle;
                        this.toggle(b)
                    }
                }, this))) : this.$element.attr("tabindex", -1), "function" == typeof this.options.display && (this.options.autotext = "always"), this.options.autotext) {
                    case"always":
                        b = !0;
                        break;
                    case"auto":
                        b = !a.trim(this.$element.text()).length && null !== this.value && void 0 !== this.value && !c;
                        break;
                    default:
                        b = !1
                }
                a.when(b ? this.render() : !0).then(a.proxy(function () {
                    this.options.disabled ? this.disable() : this.enable(), this.$element.triggerHandler("init", this)
                }, this))
            }
        }, initLive: function () {
            var b = this.options.selector;
            this.options.selector = !1, this.options.autotext = "never", this.$element.on(this.options.toggle + ".editable", b, a.proxy(function (b) {
                var c = a(b.target);
                c.data("editable") || (c.hasClass(this.options.emptyclass) && c.empty(), c.editable(this.options).trigger(b))
            }, this))
        }, render: function (a) {
            return this.options.display !== !1 ? this.input.value2htmlFinal ? this.input.value2html(this.value, this.$element[0], this.options.display, a) : "function" == typeof this.options.display ? this.options.display.call(this.$element[0], this.value, a) : this.input.value2html(this.value, this.$element[0]) : void 0
        }, enable: function () {
            this.options.disabled = !1, this.$element.removeClass("editable-disabled"), this.handleEmpty(this.isEmpty), "manual" !== this.options.toggle && "-1" === this.$element.attr("tabindex") && this.$element.removeAttr("tabindex")
        }, disable: function () {
            this.options.disabled = !0, this.hide(), this.$element.addClass("editable-disabled"), this.handleEmpty(this.isEmpty), this.$element.attr("tabindex", -1)
        }, toggleDisabled: function () {
            this.options.disabled ? this.enable() : this.disable()
        }, option: function (b, c) {
            return b && "object" == typeof b ? (a.each(b, a.proxy(function (b, c) {
                this.option(a.trim(b), c)
            }, this)), void 0) : (this.options[b] = c, "disabled" === b ? c ? this.disable() : this.enable() : ("value" === b && this.setValue(c), this.container && this.container.option(b, c), this.input.option && this.input.option(b, c), void 0))
        }, handleEmpty: function (b) {
            this.options.display !== !1 && (this.isEmpty = void 0 !== b ? b : "function" == typeof this.input.isEmpty ? this.input.isEmpty(this.$element) : "" === a.trim(this.$element.html()), this.options.disabled ? this.isEmpty && (this.$element.empty(), this.options.emptyclass && this.$element.removeClass(this.options.emptyclass)) : this.isEmpty ? (this.$element.html(this.options.emptytext), this.options.emptyclass && this.$element.addClass(this.options.emptyclass)) : this.options.emptyclass && this.$element.removeClass(this.options.emptyclass))
        }, show: function (b) {
            if (!this.options.disabled) {
                if (this.container) {
                    if (this.container.tip().is(":visible"))return
                } else {
                    var c = a.extend({}, this.options, {value: this.value, input: this.input});
                    this.$element.editableContainer(c), this.$element.on("save.internal", a.proxy(this.save, this)), this.container = this.$element.data("editableContainer")
                }
                this.container.show(b)
            }
        }, hide: function () {
            this.container && this.container.hide()
        }, toggle: function (a) {
            this.container && this.container.tip().is(":visible") ? this.hide() : this.show(a)
        }, save: function (a, b) {
            if (this.options.unsavedclass) {
                var c = !1;
                c = c || "function" == typeof this.options.url, c = c || this.options.display === !1, c = c || void 0 !== b.response, c = c || this.options.savenochange && this.input.value2str(this.value) !== this.input.value2str(b.newValue), c ? this.$element.removeClass(this.options.unsavedclass) : this.$element.addClass(this.options.unsavedclass)
            }
            if (this.options.highlight) {
                var d = this.$element, e = d.css("background-color");
                d.css("background-color", this.options.highlight), setTimeout(function () {
                    "transparent" === e && (e = ""), d.css("background-color", e), d.addClass("editable-bg-transition"), setTimeout(function () {
                        d.removeClass("editable-bg-transition")
                    }, 1700)
                }, 10)
            }
            this.setValue(b.newValue, !1, b.response)
        }, validate: function () {
            return "function" == typeof this.options.validate ? this.options.validate.call(this, this.value) : void 0
        }, setValue: function (b, c, d) {
            this.value = c ? this.input.str2value(b) : b, this.container && this.container.option("value", this.value), a.when(this.render(d)).then(a.proxy(function () {
                this.handleEmpty()
            }, this))
        }, activate: function () {
            this.container && this.container.activate()
        }, destroy: function () {
            this.disable(), this.container && this.container.destroy(), this.input.destroy(), "manual" !== this.options.toggle && (this.$element.removeClass("editable-click"), this.$element.off(this.options.toggle + ".editable")), this.$element.off("save.internal"), this.$element.removeClass("editable editable-open editable-disabled"), this.$element.removeData("editable")
        }
    }, a.fn.editable = function (c) {
        var d = {}, e = arguments, f = "editable";
        switch (c) {
            case"validate":
                return this.each(function () {
                    var b, c = a(this), e = c.data(f);
                    e && (b = e.validate()) && (d[e.options.name] = b)
                }), d;
            case"getValue":
                return 2 === arguments.length && arguments[1] === !0 ? d = this.eq(0).data(f).value : this.each(function () {
                    var b = a(this), c = b.data(f);
                    c && void 0 !== c.value && null !== c.value && (d[c.options.name] = c.input.value2submit(c.value))
                }), d;
            case"submit":
                var g, h = arguments[1] || {}, i = this, j = this.editable("validate");
                return a.isEmptyObject(j) ? (g = this.editable("getValue"), h.data && a.extend(g, h.data), a.ajax(a.extend({url: h.url, data: g, type: "POST"}, h.ajaxOptions)).success(function (a) {
                    "function" == typeof h.success && h.success.call(i, a, h)
                }).error(function () {
                    "function" == typeof h.error && h.error.apply(i, arguments)
                })) : "function" == typeof h.error && h.error.call(i, j), this
        }
        return this.each(function () {
            var d = a(this), g = d.data(f), h = "object" == typeof c && c;
            return h && h.selector ? (g = new b(this, h), void 0) : (g || d.data(f, g = new b(this, h)), "string" == typeof c && g[c].apply(g, Array.prototype.slice.call(e, 1)), void 0)
        })
    }, a.fn.editable.defaults = {
        type: "text",
        disabled: !1,
        toggle: "click",
        emptytext: "Empty",
        autotext: "auto",
        value: null,
        display: null,
        emptyclass: "editable-empty",
        unsavedclass: "editable-unsaved",
        selector: null,
        highlight: "#FFFF80"
    }
}(window.jQuery), function (a) {
    "use strict";
    a.fn.editabletypes = {};
    var b = function () {
    };
    b.prototype = {
        init: function (b, c, d) {
            this.type = b, this.options = a.extend({}, d, c)
        }, prerender: function () {
            this.$tpl = a(this.options.tpl), this.$input = this.$tpl, this.$clear = null, this.error = null
        }, render: function () {
        }, value2html: function (b, c) {
            a(c)[this.options.escape ? "text" : "html"](a.trim(b))
        }, html2value: function (b) {
            return a("<div>").html(b).text()
        }, value2str: function (a) {
            return a
        }, str2value: function (a) {
            return a
        }, value2submit: function (a) {
            return a
        }, value2input: function (a) {
            this.$input.val(a)
        }, input2value: function () {
            return this.$input.val()
        }, activate: function () {
            this.$input.is(":visible") && this.$input.focus()
        }, clear: function () {
            this.$input.val(null)
        }, escape: function (b) {
            return a("<div>").text(b).html()
        }, autosubmit: function () {
        }, destroy: function () {
        }, setClass: function () {
            this.options.inputclass && this.$input.addClass(this.options.inputclass)
        }, setAttr: function (a) {
            void 0 !== this.options[a] && null !== this.options[a] && this.$input.attr(a, this.options[a])
        }, option: function (a, b) {
            this.options[a] = b
        }
    }, b.defaults = {tpl: "", inputclass: null, escape: !0, scope: null, showbuttons: !0}, a.extend(a.fn.editabletypes, {abstractinput: b})
}(window.jQuery), function (a) {
    "use strict";
    var b = function () {
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            var b = a.Deferred();
            return this.error = null, this.onSourceReady(function () {
                this.renderList(), b.resolve()
            }, function () {
                this.error = this.options.sourceError, b.resolve()
            }), b.promise()
        }, html2value: function () {
            return null
        }, value2html: function (b, c, d, e) {
            var f = a.Deferred(), g = function () {
                "function" == typeof d ? d.call(c, b, this.sourceData, e) : this.value2htmlFinal(b, c), f.resolve()
            };
            return null === b ? g.call(this) : this.onSourceReady(g, function () {
                f.resolve()
            }), f.promise()
        }, onSourceReady: function (b, c) {
            var d;
            if (a.isFunction(this.options.source) ? (d = this.options.source.call(this.options.scope), this.sourceData = null) : d = this.options.source, this.options.sourceCache && a.isArray(this.sourceData))return b.call(this), void 0;
            try {
                d = a.fn.editableutils.tryParseJson(d, !1)
            } catch (e) {
                return c.call(this), void 0
            }
            if ("string" == typeof d) {
                if (this.options.sourceCache) {
                    var f, g = d;
                    if (a(document).data(g) || a(document).data(g, {}), f = a(document).data(g), f.loading === !1 && f.sourceData)return this.sourceData = f.sourceData, this.doPrepend(), b.call(this), void 0;
                    if (f.loading === !0)return f.callbacks.push(a.proxy(function () {
                        this.sourceData = f.sourceData, this.doPrepend(), b.call(this)
                    }, this)), f.err_callbacks.push(a.proxy(c, this)), void 0;
                    f.loading = !0, f.callbacks = [], f.err_callbacks = []
                }
                var h = a.extend({
                    url: d, type: "get", cache: !1, dataType: "json", success: a.proxy(function (d) {
                        f && (f.loading = !1), this.sourceData = this.makeArray(d), a.isArray(this.sourceData) ? (f && (f.sourceData = this.sourceData, a.each(f.callbacks, function () {
                            this.call()
                        })), this.doPrepend(), b.call(this)) : (c.call(this), f && a.each(f.err_callbacks, function () {
                            this.call()
                        }))
                    }, this), error: a.proxy(function () {
                        c.call(this), f && (f.loading = !1, a.each(f.err_callbacks, function () {
                            this.call()
                        }))
                    }, this)
                }, this.options.sourceOptions);
                a.ajax(h)
            } else this.sourceData = this.makeArray(d), a.isArray(this.sourceData) ? (this.doPrepend(), b.call(this)) : c.call(this)
        }, doPrepend: function () {
            null !== this.options.prepend && void 0 !== this.options.prepend && (a.isArray(this.prependData) || (a.isFunction(this.options.prepend) && (this.options.prepend = this.options.prepend.call(this.options.scope)), this.options.prepend = a.fn.editableutils.tryParseJson(this.options.prepend, !0), "string" == typeof this.options.prepend && (this.options.prepend = {"": this.options.prepend}), this.prependData = this.makeArray(this.options.prepend)), a.isArray(this.prependData) && a.isArray(this.sourceData) && (this.sourceData = this.prependData.concat(this.sourceData)))
        }, renderList: function () {
        }, value2htmlFinal: function () {
        }, makeArray: function (b) {
            var c, d, e, f, g = [];
            if (!b || "string" == typeof b)return null;
            if (a.isArray(b)) {
                f = function (a, b) {
                    return d = {value: a, text: b}, c++ >= 2 ? !1 : void 0
                };
                for (var h = 0; h < b.length; h++)e = b[h], "object" == typeof e ? (c = 0, a.each(e, f), 1 === c ? g.push(d) : c > 1 && (e.children && (e.children = this.makeArray(e.children)), g.push(e))) : g.push({
                    value: e,
                    text: e
                })
            } else a.each(b, function (a, b) {
                g.push({value: a, text: b})
            });
            return g
        }, option: function (a, b) {
            this.options[a] = b, "source" === a && (this.sourceData = null), "prepend" === a && (this.prependData = null)
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        source: null,
        prepend: !1,
        sourceError: "Error when loading list",
        sourceCache: !0,
        sourceOptions: null
    }), a.fn.editabletypes.list = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("text", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            this.renderClear(), this.setClass(), this.setAttr("placeholder")
        }, activate: function () {
            this.$input.is(":visible") && (this.$input.focus(), a.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length), this.toggleClear && this.toggleClear())
        }, renderClear: function () {
            this.options.clear && (this.$clear = a('<span class="editable-clear-x"></span>'), this.$input.after(this.$clear).css("padding-right", 24).keyup(a.proxy(function (b) {
                if (!~a.inArray(b.keyCode, [40, 38, 9, 13, 27])) {
                    clearTimeout(this.t);
                    var c = this;
                    this.t = setTimeout(function () {
                        c.toggleClear(b)
                    }, 100)
                }
            }, this)).parent().css("position", "relative"), this.$clear.click(a.proxy(this.clear, this)))
        }, postrender: function () {
        }, toggleClear: function () {
            if (this.$clear) {
                var a = this.$input.val().length, b = this.$clear.is(":visible");
                a && !b && this.$clear.show(), !a && b && this.$clear.hide()
            }
        }, clear: function () {
            this.$clear.hide(), this.$input.val("").focus()
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {tpl: '<input type="text">', placeholder: null, clear: !0}), a.fn.editabletypes.text = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("textarea", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            this.setClass(), this.setAttr("placeholder"), this.setAttr("rows"), this.$input.keydown(function (b) {
                b.ctrlKey && 13 === b.which && a(this).closest("form").submit()
            })
        }, activate: function () {
            a.fn.editabletypes.text.prototype.activate.call(this)
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {tpl: "<textarea></textarea>", inputclass: "input-large", placeholder: null, rows: 7}), a.fn.editabletypes.textarea = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("select", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.list), a.extend(b.prototype, {
        renderList: function () {
            this.$input.empty();
            var b = function (c, d) {
                var e;
                if (a.isArray(d))for (var f = 0; f < d.length; f++)e = {}, d[f].children ? (e.label = d[f].text, c.append(b(a("<optgroup>", e), d[f].children))) : (e.value = d[f].value, d[f].disabled && (e.disabled = !0), c.append(a("<option>", e).text(d[f].text)));
                return c
            };
            b(this.$input, this.sourceData), this.setClass(), this.$input.on("keydown.editable", function (b) {
                13 === b.which && a(this).closest("form").submit()
            })
        }, value2htmlFinal: function (b, c) {
            var d = "", e = a.fn.editableutils.itemsByValue(b, this.sourceData);
            e.length && (d = e[0].text), a.fn.editabletypes.abstractinput.prototype.value2html.call(this, d, c)
        }, autosubmit: function () {
            this.$input.off("keydown.editable").on("change.editable", function () {
                a(this).closest("form").submit()
            })
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.list.defaults, {tpl: "<select></select>"}), a.fn.editabletypes.select = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("checklist", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.list), a.extend(b.prototype, {
        renderList: function () {
            var b;
            if (this.$tpl.empty(), a.isArray(this.sourceData)) {
                for (var c = 0; c < this.sourceData.length; c++)b = a("<label>").append(a("<input>", {
                    type: "checkbox",
                    value: this.sourceData[c].value
                })).append(a("<span>").text(" " + this.sourceData[c].text)), a("<div>").append(b).appendTo(this.$tpl);
                this.$input = this.$tpl.find('input[type="checkbox"]'), this.setClass()
            }
        }, value2str: function (b) {
            return a.isArray(b) ? b.sort().join(a.trim(this.options.separator)) : ""
        }, str2value: function (b) {
            var c, d = null;
            return "string" == typeof b && b.length ? (c = new RegExp("\\s*" + a.trim(this.options.separator) + "\\s*"), d = b.split(c)) : d = a.isArray(b) ? b : [b], d
        }, value2input: function (b) {
            this.$input.prop("checked", !1), a.isArray(b) && b.length && this.$input.each(function (c, d) {
                var e = a(d);
                a.each(b, function (a, b) {
                    e.val() == b && e.prop("checked", !0)
                })
            })
        }, input2value: function () {
            var b = [];
            return this.$input.filter(":checked").each(function (c, d) {
                b.push(a(d).val())
            }), b
        }, value2htmlFinal: function (b, c) {
            var d = [], e = a.fn.editableutils.itemsByValue(b, this.sourceData), f = this.options.escape;
            e.length ? (a.each(e, function (b, c) {
                var e = f ? a.fn.editableutils.escape(c.text) : c.text;
                d.push(e)
            }), a(c).html(d.join("<br>"))) : a(c).empty()
        }, activate: function () {
            this.$input.first().focus()
        }, autosubmit: function () {
            this.$input.on("keydown", function (b) {
                13 === b.which && a(this).closest("form").submit()
            })
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.list.defaults, {tpl: '<div class="editable-checklist"></div>', inputclass: null, separator: ","}), a.fn.editabletypes.checklist = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("password", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.text), a.extend(b.prototype, {
        value2html: function (b, c) {
            b ? a(c).text("[hidden]") : a(c).empty()
        }, html2value: function () {
            return null
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.text.defaults, {tpl: '<input type="password">'}), a.fn.editabletypes.password = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("email", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.text), b.defaults = a.extend({}, a.fn.editabletypes.text.defaults, {tpl: '<input type="email">'}), a.fn.editabletypes.email = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("url", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.text), b.defaults = a.extend({}, a.fn.editabletypes.text.defaults, {tpl: '<input type="url">'}), a.fn.editabletypes.url = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("tel", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.text), b.defaults = a.extend({}, a.fn.editabletypes.text.defaults, {tpl: '<input type="tel">'}), a.fn.editabletypes.tel = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("number", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.text), a.extend(b.prototype, {
        render: function () {
            b.superclass.render.call(this), this.setAttr("min"), this.setAttr("max"), this.setAttr("step")
        }, postrender: function () {
            this.$clear && this.$clear.css({right: 24})
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.text.defaults, {tpl: '<input type="number">', inputclass: "input-mini", min: null, max: null, step: null}), a.fn.editabletypes.number = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("range", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.number), a.extend(b.prototype, {
        render: function () {
            this.$input = this.$tpl.filter("input"), this.setClass(), this.setAttr("min"), this.setAttr("max"), this.setAttr("step"), this.$input.on("input", function () {
                a(this).siblings("output").text(a(this).val())
            })
        }, activate: function () {
            this.$input.focus()
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.number.defaults, {
        tpl: '<input type="range"><output style="width: 30px; display: inline-block"></output>',
        inputclass: "input-medium"
    }), a.fn.editabletypes.range = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("time", a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            this.setClass()
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {tpl: '<input type="time">'}), a.fn.editabletypes.time = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (c) {
        if (this.init("select2", c, b.defaults), c.select2 = c.select2 || {}, this.sourceData = null, c.placeholder && (c.select2.placeholder = c.placeholder), !c.select2.tags && c.source) {
            var d = c.source;
            a.isFunction(c.source) && (d = c.source.call(c.scope)), "string" == typeof d ? (c.select2.ajax = c.select2.ajax || {}, c.select2.ajax.data || (c.select2.ajax.data = function (a) {
                return {query: a}
            }), c.select2.ajax.results || (c.select2.ajax.results = function (a) {
                return {results: a}
            }), c.select2.ajax.url = d) : (this.sourceData = this.convertSource(d), c.select2.data = this.sourceData)
        }
        if (this.options.select2 = a.extend({}, b.defaults.select2, c.select2), this.isMultiple = this.options.select2.tags || this.options.select2.multiple, this.isRemote = "ajax"in this.options.select2, this.idFunc = this.options.select2.id, "function" != typeof this.idFunc) {
            var e = this.idFunc || "id";
            this.idFunc = function (a) {
                return a[e]
            }
        }
        this.formatSelection = this.options.select2.formatSelection, "function" != typeof this.formatSelection && (this.formatSelection = function (a) {
            return a.text
        })
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            this.setClass(), this.isRemote && this.$input.on("select2-loaded", a.proxy(function (a) {
                this.sourceData = a.items.results
            }, this)), this.isMultiple && this.$input.on("change", function () {
                a(this).closest("form").parent().triggerHandler("resize")
            })
        }, value2html: function (c, d) {
            var e, f = "", g = this;
            this.options.select2.tags ? e = c : this.sourceData && (e = a.fn.editableutils.itemsByValue(c, this.sourceData, this.idFunc)), a.isArray(e) ? (f = [], a.each(e, function (a, b) {
                f.push(b && "object" == typeof b ? g.formatSelection(b) : b)
            })) : e && (f = g.formatSelection(e)), f = a.isArray(f) ? f.join(this.options.viewseparator) : f, b.superclass.value2html.call(this, f, d)
        }, html2value: function (a) {
            return this.options.select2.tags ? this.str2value(a, this.options.viewseparator) : null
        }, value2input: function (b) {
            if (this.$input.data("select2") ? this.$input.val(b).trigger("change", !0) : (this.$input.val(b), this.$input.select2(this.options.select2)), this.isRemote && !this.isMultiple && !this.options.select2.initSelection) {
                var c = this.options.select2.id, d = this.options.select2.formatSelection;
                if (!c && !d) {
                    var e = {id: b, text: a(this.options.scope).text()};
                    this.$input.select2("data", e)
                }
            }
        }, input2value: function () {
            return this.$input.select2("val")
        }, str2value: function (b, c) {
            if ("string" != typeof b || !this.isMultiple)return b;
            c = c || this.options.select2.separator || a.fn.select2.defaults.separator;
            var d, e, f;
            if (null === b || b.length < 1)return null;
            for (d = b.split(c), e = 0, f = d.length; f > e; e += 1)d[e] = a.trim(d[e]);
            return d
        }, autosubmit: function () {
            this.$input.on("change", function (b, c) {
                c || a(this).closest("form").submit()
            })
        }, convertSource: function (b) {
            if (a.isArray(b) && b.length && void 0 !== b[0].value)for (var c = 0; c < b.length; c++)void 0 !== b[c].value && (b[c].id = b[c].value, delete b[c].value);
            return b
        }, destroy: function () {
            this.$input.data("select2") && this.$input.select2("destroy")
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="hidden">',
        select2: null,
        placeholder: null,
        source: null,
        viewseparator: ", "
    }), a.fn.editabletypes.select2 = b
}(window.jQuery), function (a) {
    var b = function (b, c) {
        return this.$element = a(b), this.$element.is("input") ? (this.options = a.extend({}, a.fn.combodate.defaults, c, this.$element.data()), this.init(), void 0) : (a.error("Combodate should be applied to INPUT element"), void 0)
    };
    b.prototype = {
        constructor: b, init: function () {
            this.map = {
                day: ["D", "date"],
                month: ["M", "month"],
                year: ["Y", "year"],
                hour: ["[Hh]", "hours"],
                minute: ["m", "minutes"],
                second: ["s", "seconds"],
                ampm: ["[Aa]", ""]
            }, this.$widget = a('<span class="combodate"></span>').html(this.getTemplate()), this.initCombos(), this.$widget.on("change", "select", a.proxy(function () {
                this.$element.val(this.getValue())
            }, this)), this.$widget.find("select").css("width", "auto"), this.$element.hide().after(this.$widget), this.setValue(this.$element.val() || this.options.value)
        }, getTemplate: function () {
            var b = this.options.template;
            return a.each(this.map, function (a, c) {
                c = c[0];
                var d = new RegExp(c + "+"), e = c.length > 1 ? c.substring(1, 2) : c;
                b = b.replace(d, "{" + e + "}")
            }), b = b.replace(/ /g, "&nbsp;"), a.each(this.map, function (a, c) {
                c = c[0];
                var d = c.length > 1 ? c.substring(1, 2) : c;
                b = b.replace("{" + d + "}", '<select class="' + a + '"></select>')
            }), b
        }, initCombos: function () {
            var b = this;
            a.each(this.map, function (a) {
                var c, d, e = b.$widget.find("." + a);
                e.length && (b["$" + a] = e, c = "fill" + a.charAt(0).toUpperCase() + a.slice(1), d = b[c](), b["$" + a].html(b.renderItems(d)))
            })
        }, initItems: function (a) {
            var b, c = [];
            if ("name" === this.options.firstItem) {
                b = moment.relativeTime || moment.langData()._relativeTime;
                var d = "function" == typeof b[a] ? b[a](1, !0, a, !1) : b[a];
                d = d.split(" ").reverse()[0], c.push(["", d])
            } else"empty" === this.options.firstItem && c.push(["", ""]);
            return c
        }, renderItems: function (a) {
            for (var b = [], c = 0; c < a.length; c++)b.push('<option value="' + a[c][0] + '">' + a[c][1] + "</option>");
            return b.join("\n")
        }, fillDay: function () {
            var a, b, c = this.initItems("d"), d = -1 !== this.options.template.indexOf("DD");
            for (b = 1; 31 >= b; b++)a = d ? this.leadZero(b) : b, c.push([b, a]);
            return c
        }, fillMonth: function () {
            var a, b, c = this.initItems("M"), d = -1 !== this.options.template.indexOf("MMMM"), e = -1 !== this.options.template.indexOf("MMM"), f = -1 !== this.options.template.indexOf("MM");
            for (b = 0; 11 >= b; b++)a = d ? moment().date(1).month(b).format("MMMM") : e ? moment().date(1).month(b).format("MMM") : f ? this.leadZero(b + 1) : b + 1, c.push([b, a]);
            return c
        }, fillYear: function () {
            var a, b, c = [], d = -1 !== this.options.template.indexOf("YYYY");
            for (b = this.options.maxYear; b >= this.options.minYear; b--)a = d ? b : (b + "").substring(2), c[this.options.yearDescending ? "push" : "unshift"]([b, a]);
            return c = this.initItems("y").concat(c)
        }, fillHour: function () {
            var a, b, c = this.initItems("h"), d = -1 !== this.options.template.indexOf("h"), e = (-1 !== this.options.template.indexOf("H"), -1 !== this.options.template.toLowerCase().indexOf("hh")), f = d ? 1 : 0, g = d ? 12 : 23;
            for (b = f; g >= b; b++)a = e ? this.leadZero(b) : b, c.push([b, a]);
            return c
        }, fillMinute: function () {
            var a, b, c = this.initItems("m"), d = -1 !== this.options.template.indexOf("mm");
            for (b = 0; 59 >= b; b += this.options.minuteStep)a = d ? this.leadZero(b) : b, c.push([b, a]);
            return c
        }, fillSecond: function () {
            var a, b, c = this.initItems("s"), d = -1 !== this.options.template.indexOf("ss");
            for (b = 0; 59 >= b; b += this.options.secondStep)a = d ? this.leadZero(b) : b, c.push([b, a]);
            return c
        }, fillAmpm: function () {
            var a = -1 !== this.options.template.indexOf("a"), b = (-1 !== this.options.template.indexOf("A"), [["am", a ? "am" : "AM"], ["pm", a ? "pm" : "PM"]]);
            return b
        }, getValue: function (b) {
            var c, d = {}, e = this, f = !1;
            return a.each(this.map, function (a) {
                if ("ampm" !== a) {
                    var b = "day" === a ? 1 : 0;
                    return d[a] = e["$" + a] ? parseInt(e["$" + a].val(), 10) : b, isNaN(d[a]) ? (f = !0, !1) : void 0
                }
            }), f ? "" : (this.$ampm && (d.hour = 12 === d.hour ? "am" === this.$ampm.val() ? 0 : 12 : "am" === this.$ampm.val() ? d.hour : d.hour + 12), c = moment([d.year, d.month, d.day, d.hour, d.minute, d.second]), this.highlight(c), b = void 0 === b ? this.options.format : b, null === b ? c.isValid() ? c : null : c.isValid() ? c.format(b) : "")
        }, setValue: function (b) {
            function c(b, c) {
                var d = {};
                return b.children("option").each(function (b, e) {
                    var f, g = a(e).attr("value");
                    "" !== g && (f = Math.abs(g - c), ("undefined" == typeof d.distance || f < d.distance) && (d = {value: g, distance: f}))
                }), d.value
            }

            if (b) {
                var d = "string" == typeof b ? moment(b, this.options.format) : moment(b), e = this, f = {};
                d.isValid() && (a.each(this.map, function (a, b) {
                    "ampm" !== a && (f[a] = d[b[1]]())
                }), this.$ampm && (f.hour >= 12 ? (f.ampm = "pm", f.hour > 12 && (f.hour -= 12)) : (f.ampm = "am", 0 === f.hour && (f.hour = 12))), a.each(f, function (a, b) {
                    e["$" + a] && ("minute" === a && e.options.minuteStep > 1 && e.options.roundTime && (b = c(e["$" + a], b)), "second" === a && e.options.secondStep > 1 && e.options.roundTime && (b = c(e["$" + a], b)), e["$" + a].val(b))
                }), this.$element.val(d.format(this.options.format)))
            }
        }, highlight: function (a) {
            a.isValid() ? this.options.errorClass ? this.$widget.removeClass(this.options.errorClass) : this.$widget.find("select").css("border-color", this.borderColor) : this.options.errorClass ? this.$widget.addClass(this.options.errorClass) : (this.borderColor || (this.borderColor = this.$widget.find("select").css("border-color")), this.$widget.find("select").css("border-color", "red"))
        }, leadZero: function (a) {
            return 9 >= a ? "0" + a : a
        }, destroy: function () {
            this.$widget.remove(), this.$element.removeData("combodate").show()
        }
    }, a.fn.combodate = function (c) {
        var d, e = Array.apply(null, arguments);
        return e.shift(), "getValue" === c && this.length && (d = this.eq(0).data("combodate")) ? d.getValue.apply(d, e) : this.each(function () {
            var d = a(this), f = d.data("combodate"), g = "object" == typeof c && c;
            f || d.data("combodate", f = new b(this, g)), "string" == typeof c && "function" == typeof f[c] && f[c].apply(f, e)
        })
    }, a.fn.combodate.defaults = {
        format: "DD-MM-YYYY HH:mm",
        template: "D / MMM / YYYY   H : mm",
        value: null,
        minYear: 1970,
        maxYear: 2015,
        yearDescending: !0,
        minuteStep: 5,
        secondStep: 1,
        firstItem: "empty",
        errorClass: null,
        roundTime: !0
    }
}(window.jQuery), function (a) {
    "use strict";
    var b = function (c) {
        this.init("combodate", c, b.defaults), this.options.viewformat || (this.options.viewformat = this.options.format), c.combodate = a.fn.editableutils.tryParseJson(c.combodate, !0), this.options.combodate = a.extend({}, b.defaults.combodate, c.combodate, {
            format: this.options.format,
            template: this.options.template
        })
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            this.$input.combodate(this.options.combodate), "bs3" === a.fn.editableform.engine && this.$input.siblings().find("select").addClass("form-control"), this.options.inputclass && this.$input.siblings().find("select").addClass(this.options.inputclass)
        }, value2html: function (a, c) {
            var d = a ? a.format(this.options.viewformat) : "";
            b.superclass.value2html.call(this, d, c)
        }, html2value: function (a) {
            return a ? moment(a, this.options.viewformat) : null
        }, value2str: function (a) {
            return a ? a.format(this.options.format) : ""
        }, str2value: function (a) {
            return a ? moment(a, this.options.format) : null
        }, value2submit: function (a) {
            return this.value2str(a)
        }, value2input: function (a) {
            this.$input.combodate("setValue", a)
        }, input2value: function () {
            return this.$input.combodate("getValue", null)
        }, activate: function () {
            this.$input.siblings(".combodate").find("select").eq(0).focus()
        }, autosubmit: function () {
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text">',
        inputclass: null,
        format: "YYYY-MM-DD",
        viewformat: null,
        template: "D / MMM / YYYY",
        combodate: null
    }), a.fn.editabletypes.combodate = b
}(window.jQuery), function (a) {
    "use strict";
    var b = a.fn.editableform.Constructor.prototype.initInput;
    a.extend(a.fn.editableform.Constructor.prototype, {
        initTemplate: function () {
            this.$form = a(a.fn.editableform.template), this.$form.find(".control-group").addClass("form-group"), this.$form.find(".editable-error-block").addClass("help-block")
        }, initInput: function () {
            b.apply(this);
            var c = null === this.input.options.inputclass || this.input.options.inputclass === !1, d = "input-sm", e = "text,select,textarea,password,email,url,tel,number,range,time,typeaheadjs".split(",");
            ~a.inArray(this.input.type, e) && (this.input.$input.addClass("form-control"), c && (this.input.options.inputclass = d, this.input.$input.addClass(d)));
            for (var f = this.$form.find(".editable-buttons"), g = c ? [d] : this.input.options.inputclass.split(" "), h = 0; h < g.length; h++)"input-lg" === g[h].toLowerCase() && f.find("button").removeClass("btn-sm").addClass("btn-lg")
        }
    }), a.fn.editableform.buttons = '<button type="submit" class="btn btn-primary btn-sm editable-submit"><i class="glyphicon fa fa-check page-edit-button"></i></button><button type="button" class="btn btn-default btn-sm editable-cancel"><i class="glyphicon fa fa-close page-edit-button"></i></button>', a.fn.editableform.errorGroupClass = "has-error", a.fn.editableform.errorBlockClass = null, a.fn.editableform.engine = "bs3"
}(window.jQuery), function (a) {
    "use strict";
    a.extend(a.fn.editableContainer.Popup.prototype, {
        containerName: "popover",
        containerDataName: "bs.popover",
        innerCss: ".popover-content",
        defaults: a.fn.popover.Constructor.DEFAULTS,
        initContainer: function () {
            a.extend(this.containerOptions, {trigger: "manual", selector: !1, content: " ", template: this.defaults.template});
            var b;
            this.$element.data("template") && (b = this.$element.data("template"), this.$element.removeData("template")), this.call(this.containerOptions), b && this.$element.data("template", b)
        },
        innerShow: function () {
            this.call("show")
        },
        innerHide: function () {
            this.call("hide")
        },
        innerDestroy: function () {
            this.call("destroy")
        },
        setContainerOption: function (a, b) {
            this.container().options[a] = b
        },
        setPosition: function () {
            !function () {
                var a = this.tip(), b = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, c = this.getPosition(), d = a[0].offsetWidth, e = a[0].offsetHeight, f = this.getCalculatedOffset(b, c, d, e);
                this.applyPlacement(f, b)
            }.call(this.container())
        }
    })
}(window.jQuery), function (a) {
    function b() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function c(b, c) {
        var d, e = a(b).data(), f = {}, g = new RegExp("^" + c.toLowerCase() + "([A-Z])"), c = new RegExp("^" + c.toLowerCase());
        for (var h in e)c.test(h) && (d = h.replace(g, function (a, b) {
            return b.toLowerCase()
        }), f[d] = e[h]);
        return f
    }

    function d(b) {
        var c = {};
        if (k[b] || (b = b.split("-")[0], k[b])) {
            var d = k[b];
            return a.each(j, function (a, b) {
                b in d && (c[b] = d[b])
            }), c
        }
    }

    var e = function (b, c) {
        this._process_options(c), this.element = a(b), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = a(l.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && (this.picker.addClass("datepicker-rtl"), this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function (a, b) {
            return parseInt(b) + 1
        }), this._allow_update = !1, this.setStartDate(this.o.startDate), this.setEndDate(this.o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
    };
    e.prototype = {
        constructor: e, _process_options: function (b) {
            this._o = a.extend({}, this._o, b);
            var c = this.o = a.extend({}, this._o), d = c.language;
            switch (k[d] || (d = d.split("-")[0], k[d] || (d = i.language)), c.language = d, c.startView) {
                case 2:
                case"decade":
                    c.startView = 2;
                    break;
                case 1:
                case"year":
                    c.startView = 1;
                    break;
                default:
                    c.startView = 0
            }
            switch (c.minViewMode) {
                case 1:
                case"months":
                    c.minViewMode = 1;
                    break;
                case 2:
                case"years":
                    c.minViewMode = 2;
                    break;
                default:
                    c.minViewMode = 0
            }
            c.startView = Math.max(c.startView, c.minViewMode), c.weekStart %= 7, c.weekEnd = (c.weekStart + 6) % 7;
            var e = l.parseFormat(c.format);
            c.startDate !== -1 / 0 && (c.startDate = l.parseDate(c.startDate, e, c.language)), 1 / 0 !== c.endDate && (c.endDate = l.parseDate(c.endDate, e, c.language)), c.daysOfWeekDisabled = c.daysOfWeekDisabled || [], a.isArray(c.daysOfWeekDisabled) || (c.daysOfWeekDisabled = c.daysOfWeekDisabled.split(/[,\s]*/)), c.daysOfWeekDisabled = a.map(c.daysOfWeekDisabled, function (a) {
                return parseInt(a, 10)
            })
        }, _events: [], _secondaryEvents: [], _applyEvents: function (a) {
            for (var b, c, d = 0; d < a.length; d++)b = a[d][0], c = a[d][1], b.on(c)
        }, _unapplyEvents: function (a) {
            for (var b, c, d = 0; d < a.length; d++)b = a[d][0], c = a[d][1], b.off(c)
        }, _buildEvents: function () {
            this.isInput ? this._events = [[this.element, {
                focus: a.proxy(this.show, this),
                keyup: a.proxy(this.update, this),
                keydown: a.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), {
                focus: a.proxy(this.show, this),
                keyup: a.proxy(this.update, this),
                keydown: a.proxy(this.keydown, this)
            }], [this.component, {click: a.proxy(this.show, this)}]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: a.proxy(this.show, this)}]], this._secondaryEvents = [[this.picker, {click: a.proxy(this.click, this)}], [a(window), {resize: a.proxy(this.place, this)}], [a(document), {
                mousedown: a.proxy(function (a) {
                    this.element.is(a.target) || this.element.find(a.target).size() || this.picker.is(a.target) || this.picker.find(a.target).size() || this.hide()
                }, this)
            }]]
        }, _attachEvents: function () {
            this._detachEvents(), this._applyEvents(this._events)
        }, _detachEvents: function () {
            this._unapplyEvents(this._events)
        }, _attachSecondaryEvents: function () {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        }, _detachSecondaryEvents: function () {
            this._unapplyEvents(this._secondaryEvents)
        }, _trigger: function (b, c) {
            var d = c || this.date, e = new Date(d.getTime() + 6e4 * d.getTimezoneOffset());
            this.element.trigger({
                type: b, date: e, format: a.proxy(function (a) {
                    var b = a || this.o.format;
                    return l.formatDate(d, b, this.o.language)
                }, this)
            })
        }, show: function (a) {
            this.isInline || this.picker.appendTo("body"), this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), this._attachSecondaryEvents(), a && a.preventDefault(), this._trigger("show")
        }, hide: function () {
            this.isInline || this.picker.is(":visible") && (this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
        }, remove: function () {
            this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
        }, getDate: function () {
            var a = this.getUTCDate();
            return new Date(a.getTime() + 6e4 * a.getTimezoneOffset())
        }, getUTCDate: function () {
            return this.date
        }, setDate: function (a) {
            this.setUTCDate(new Date(a.getTime() - 6e4 * a.getTimezoneOffset()))
        }, setUTCDate: function (a) {
            this.date = a, this.setValue()
        }, setValue: function () {
            var a = this.getFormattedDate();
            this.isInput ? this.element.val(a) : this.component && this.element.find("input").val(a)
        }, getFormattedDate: function (a) {
            return void 0 === a && (a = this.o.format), l.formatDate(this.date, a, this.o.language)
        }, setStartDate: function (a) {
            this._process_options({startDate: a}), this.update(), this.updateNavArrows()
        }, setEndDate: function (a) {
            this._process_options({endDate: a}), this.update(), this.updateNavArrows()
        }, setDaysOfWeekDisabled: function (a) {
            this._process_options({daysOfWeekDisabled: a}), this.update(), this.updateNavArrows()
        }, place: function () {
            if (!this.isInline) {
                var b = parseInt(this.element.parents().filter(function () {
                        return "auto" != a(this).css("z-index")
                    }).first().css("z-index")) + 10, c = this.component ? this.component.parent().offset() : this.element.offset(), d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!0);
                this.picker.css({top: c.top + d, left: c.left, zIndex: b})
            }
        }, _allow_update: !0, update: function () {
            if (this._allow_update) {
                var a, b = !1;
                arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0]instanceof Date) ? (a = arguments[0], b = !0) : (a = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), delete this.element.data().date), this.date = l.parseDate(a, this.o.format, this.o.language), b && this.setValue(), this.viewDate = this.date < this.o.startDate ? new Date(this.o.startDate) : this.date > this.o.endDate ? new Date(this.o.endDate) : new Date(this.date), this.fill()
            }
        }, fillDow: function () {
            var a = this.o.weekStart, b = "<tr>";
            if (this.o.calendarWeeks) {
                var c = '<th class="cw">&nbsp;</th>';
                b += c, this.picker.find(".datepicker-days thead tr:first-child").prepend(c)
            }
            for (; a < this.o.weekStart + 7;)b += '<th class="dow">' + k[this.o.language].daysMin[a++ % 7] + "</th>";
            b += "</tr>", this.picker.find(".datepicker-days thead").append(b)
        }, fillMonths: function () {
            for (var a = "", b = 0; 12 > b;)a += '<span class="month">' + k[this.o.language].monthsShort[b++] + "</span>";
            this.picker.find(".datepicker-months td").html(a)
        }, setRange: function (b) {
            b && b.length ? this.range = a.map(b, function (a) {
                return a.valueOf()
            }) : delete this.range, this.fill()
        }, getClassNames: function (b) {
            var c = [], d = this.viewDate.getUTCFullYear(), e = this.viewDate.getUTCMonth(), f = this.date.valueOf(), g = new Date;
            return b.getUTCFullYear() < d || b.getUTCFullYear() == d && b.getUTCMonth() < e ? c.push("old") : (b.getUTCFullYear() > d || b.getUTCFullYear() == d && b.getUTCMonth() > e) && c.push("new"), this.o.todayHighlight && b.getUTCFullYear() == g.getFullYear() && b.getUTCMonth() == g.getMonth() && b.getUTCDate() == g.getDate() && c.push("today"), f && b.valueOf() == f && c.push("active"), (b.valueOf() < this.o.startDate || b.valueOf() > this.o.endDate || -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled)) && c.push("disabled"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 != a.inArray(b.valueOf(), this.range) && c.push("selected")), c
        }, fill: function () {
            var c, d = new Date(this.viewDate), e = d.getUTCFullYear(), f = d.getUTCMonth(), g = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, h = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, i = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0, j = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0;
            this.date && this.date.valueOf(), this.picker.find(".datepicker-days thead th.datepicker-switch").text(k[this.o.language].months[f] + " " + e), this.picker.find("tfoot th.today").text(k[this.o.language].today).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(k[this.o.language].clear).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
            var m = b(e, f - 1, 28, 0, 0, 0, 0), n = l.getDaysInMonth(m.getUTCFullYear(), m.getUTCMonth());
            m.setUTCDate(n), m.setUTCDate(n - (m.getUTCDay() - this.o.weekStart + 7) % 7);
            var o = new Date(m);
            o.setUTCDate(o.getUTCDate() + 42), o = o.valueOf();
            for (var p, q = []; m.valueOf() < o;) {
                if (m.getUTCDay() == this.o.weekStart && (q.push("<tr>"), this.o.calendarWeeks)) {
                    var r = new Date(+m + 864e5 * ((this.o.weekStart - m.getUTCDay() - 7) % 7)), s = new Date(+r + 864e5 * ((11 - r.getUTCDay()) % 7)), t = new Date(+(t = b(s.getUTCFullYear(), 0, 1)) + 864e5 * ((11 - t.getUTCDay()) % 7)), u = (s - t) / 864e5 / 7 + 1;
                    q.push('<td class="cw">' + u + "</td>")
                }
                p = this.getClassNames(m), p.push("day");
                var v = this.o.beforeShowDay(m);
                void 0 === v ? v = {} : "boolean" == typeof v ? v = {enabled: v} : "string" == typeof v && (v = {classes: v}), v.enabled === !1 && p.push("disabled"), v.classes && (p = p.concat(v.classes.split(/\s+/))), v.tooltip && (c = v.tooltip), p = a.unique(p), q.push('<td class="' + p.join(" ") + '"' + (c ? ' title="' + c + '"' : "") + ">" + m.getUTCDate() + "</td>"), m.getUTCDay() == this.o.weekEnd && q.push("</tr>"), m.setUTCDate(m.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(q.join(""));
            var w = this.date && this.date.getUTCFullYear(), x = this.picker.find(".datepicker-months").find("th:eq(1)").text(e).end().find("span").removeClass("active");
            w && w == e && x.eq(this.date.getUTCMonth()).addClass("active"), (g > e || e > i) && x.addClass("disabled"), e == g && x.slice(0, h).addClass("disabled"), e == i && x.slice(j + 1).addClass("disabled"), q = "", e = 10 * parseInt(e / 10, 10);
            var y = this.picker.find(".datepicker-years").find("th:eq(1)").text(e + "-" + (e + 9)).end().find("td");
            e -= 1;
            for (var z = -1; 11 > z; z++)q += '<span class="year' + (-1 == z ? " old" : 10 == z ? " new" : "") + (w == e ? " active" : "") + (g > e || e > i ? " disabled" : "") + '">' + e + "</span>", e += 1;
            y.html(q)
        }, updateNavArrows: function () {
            if (this._allow_update) {
                var a = new Date(this.viewDate), b = a.getUTCFullYear(), c = a.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.o.startDate !== -1 / 0 && b <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), 1 / 0 !== this.o.endDate && b >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                        break;
                    case 1:
                    case 2:
                        this.o.startDate !== -1 / 0 && b <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), 1 / 0 !== this.o.endDate && b >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"})
                }
            }
        }, click: function (c) {
            c.preventDefault();
            var d = a(c.target).closest("span, td, th");
            if (1 == d.length)switch (d[0].nodeName.toLowerCase()) {
                case"th":
                    switch (d[0].className) {
                        case"datepicker-switch":
                            this.showMode(1);
                            break;
                        case"prev":
                        case"next":
                            var e = l.modes[this.viewMode].navStep * ("prev" == d[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, e);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, e)
                            }
                            this.fill();
                            break;
                        case"today":
                            var f = new Date;
                            f = b(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0), this.showMode(-2);
                            var g = "linked" == this.o.todayBtn ? null : "view";
                            this._setDate(f, g);
                            break;
                        case"clear":
                            var h;
                            this.isInput ? h = this.element : this.component && (h = this.element.find("input")), h && h.val("").change(), this._trigger("changeDate"), this.update(), this.o.autoclose && this.hide()
                    }
                    break;
                case"span":
                    if (!d.is(".disabled")) {
                        if (this.viewDate.setUTCDate(1), d.is(".month")) {
                            var i = 1, j = d.parent().find("span").index(d), k = this.viewDate.getUTCFullYear();
                            this.viewDate.setUTCMonth(j), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(b(k, j, i, 0, 0, 0, 0))
                        } else {
                            var k = parseInt(d.text(), 10) || 0, i = 1, j = 0;
                            this.viewDate.setUTCFullYear(k), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(b(k, j, i, 0, 0, 0, 0))
                        }
                        this.showMode(-1), this.fill()
                    }
                    break;
                case"td":
                    if (d.is(".day") && !d.is(".disabled")) {
                        var i = parseInt(d.text(), 10) || 1, k = this.viewDate.getUTCFullYear(), j = this.viewDate.getUTCMonth();
                        d.is(".old") ? 0 === j ? (j = 11, k -= 1) : j -= 1 : d.is(".new") && (11 == j ? (j = 0, k += 1) : j += 1), this._setDate(b(k, j, i, 0, 0, 0, 0))
                    }
            }
        }, _setDate: function (a, b) {
            b && "date" != b || (this.date = new Date(a)), b && "view" != b || (this.viewDate = new Date(a)), this.fill(), this.setValue(), this._trigger("changeDate");
            var c;
            this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && (c.change(), !this.o.autoclose || b && "date" != b || this.hide())
        }, moveMonth: function (a, b) {
            if (!b)return a;
            var c, d, e = new Date(a.valueOf()), f = e.getUTCDate(), g = e.getUTCMonth(), h = Math.abs(b);
            if (b = b > 0 ? 1 : -1, 1 == h)d = -1 == b ? function () {
                return e.getUTCMonth() == g
            } : function () {
                return e.getUTCMonth() != c
            }, c = g + b, e.setUTCMonth(c), (0 > c || c > 11) && (c = (c + 12) % 12); else {
                for (var i = 0; h > i; i++)e = this.moveMonth(e, b);
                c = e.getUTCMonth(), e.setUTCDate(f), d = function () {
                    return c != e.getUTCMonth()
                }
            }
            for (; d();)e.setUTCDate(--f), e.setUTCMonth(c);
            return e
        }, moveYear: function (a, b) {
            return this.moveMonth(a, 12 * b)
        }, dateWithinRange: function (a) {
            return a >= this.o.startDate && a <= this.o.endDate
        }, keydown: function (a) {
            if (this.picker.is(":not(:visible)"))return 27 == a.keyCode && this.show(), void 0;
            var b, c, d, e = !1;
            switch (a.keyCode) {
                case 27:
                    this.hide(), a.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.o.keyboardNavigation)break;
                    b = 37 == a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.date, b), d = this.moveYear(this.viewDate, b)) : a.shiftKey ? (c = this.moveMonth(this.date, b), d = this.moveMonth(this.viewDate, b)) : (c = new Date(this.date), c.setUTCDate(this.date.getUTCDate() + b), d = new Date(this.viewDate), d.setUTCDate(this.viewDate.getUTCDate() + b)), this.dateWithinRange(c) && (this.date = c, this.viewDate = d, this.setValue(), this.update(), a.preventDefault(), e = !0);
                    break;
                case 38:
                case 40:
                    if (!this.o.keyboardNavigation)break;
                    b = 38 == a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.date, b), d = this.moveYear(this.viewDate, b)) : a.shiftKey ? (c = this.moveMonth(this.date, b), d = this.moveMonth(this.viewDate, b)) : (c = new Date(this.date), c.setUTCDate(this.date.getUTCDate() + 7 * b), d = new Date(this.viewDate), d.setUTCDate(this.viewDate.getUTCDate() + 7 * b)), this.dateWithinRange(c) && (this.date = c, this.viewDate = d, this.setValue(), this.update(), a.preventDefault(), e = !0);
                    break;
                case 13:
                    this.hide(), a.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (e) {
                this._trigger("changeDate");
                var f;
                this.isInput ? f = this.element : this.component && (f = this.element.find("input")), f && f.change()
            }
        }, showMode: function (a) {
            a && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + a))), this.picker.find(">div").hide().filter(".datepicker-" + l.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    };
    var f = function (b, c) {
        this.element = a(b), this.inputs = a.map(c.inputs, function (a) {
            return a.jquery ? a[0] : a
        }), delete c.inputs, a(this.inputs).datepicker(c).bind("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function (b) {
            return a(b).data("datepicker")
        }), this.updateDates()
    };
    f.prototype = {
        updateDates: function () {
            this.dates = a.map(this.pickers, function (a) {
                return a.date
            }), this.updateRanges()
        }, updateRanges: function () {
            var b = a.map(this.dates, function (a) {
                return a.valueOf()
            });
            a.each(this.pickers, function (a, c) {
                c.setRange(b)
            })
        }, dateUpdated: function (b) {
            var c = a(b.target).data("datepicker"), d = c.getUTCDate(), e = a.inArray(b.target, this.inputs), f = this.inputs.length;
            if (-1 != e) {
                if (d < this.dates[e])for (; e >= 0 && d < this.dates[e];)this.pickers[e--].setUTCDate(d); else if (d > this.dates[e])for (; f > e && d > this.dates[e];)this.pickers[e++].setUTCDate(d);
                this.updateDates()
            }
        }, remove: function () {
            a.map(this.pickers, function (a) {
                a.remove()
            }), delete this.element.data().datepicker
        }
    };
    var g = a.fn.datepicker, h = a.fn.datepicker = function (b) {
        var g = Array.apply(null, arguments);
        g.shift();
        var h;
        return this.each(function () {
            var j = a(this), k = j.data("datepicker"), l = "object" == typeof b && b;
            if (!k) {
                var m = c(this, "date"), n = a.extend({}, i, m, l), o = d(n.language), p = a.extend({}, i, o, m, l);
                if (j.is(".input-daterange") || p.inputs) {
                    var q = {inputs: p.inputs || j.find("input").toArray()};
                    j.data("datepicker", k = new f(this, a.extend(p, q)))
                } else j.data("datepicker", k = new e(this, p))
            }
            return "string" == typeof b && "function" == typeof k[b] && (h = k[b].apply(k, g), void 0 !== h) ? !1 : void 0
        }), void 0 !== h ? h : this
    }, i = a.fn.datepicker.defaults = {
        autoclose: !1,
        beforeShowDay: a.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        daysOfWeekDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0
    }, j = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    a.fn.datepicker.Constructor = e;
    var k = a.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear"
        }
    }, l = {
        modes: [{clsName: "days", navFnc: "Month", navStep: 1}, {clsName: "months", navFnc: "FullYear", navStep: 1}, {clsName: "years", navFnc: "FullYear", navStep: 10}],
        isLeapYear: function (a) {
            return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400
        },
        getDaysInMonth: function (a, b) {
            return [31, l.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function (a) {
            var b = a.replace(this.validParts, "\0").split("\0"), c = a.match(this.validParts);
            if (!b || !b.length || !c || 0 === c.length)throw new Error("Invalid date format.");
            return {separators: b, parts: c}
        },
        parseDate: function (c, d, f) {
            if (c instanceof Date)return c;
            if ("string" == typeof d && (d = l.parseFormat(d)), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(c)) {
                var g, h, i = /([\-+]\d+)([dmwy])/, j = c.match(/([\-+]\d+)([dmwy])/g);
                c = new Date;
                for (var m = 0; m < j.length; m++)switch (g = i.exec(j[m]), h = parseInt(g[1]), g[2]) {
                    case"d":
                        c.setUTCDate(c.getUTCDate() + h);
                        break;
                    case"m":
                        c = e.prototype.moveMonth.call(e.prototype, c, h);
                        break;
                    case"w":
                        c.setUTCDate(c.getUTCDate() + 7 * h);
                        break;
                    case"y":
                        c = e.prototype.moveYear.call(e.prototype, c, h)
                }
                return b(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate(), 0, 0, 0)
            }
            var n, o, g, j = c && c.match(this.nonpunctuation) || [], c = new Date, p = {}, q = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], r = {
                yyyy: function (a, b) {
                    return a.setUTCFullYear(b)
                }, yy: function (a, b) {
                    return a.setUTCFullYear(2e3 + b)
                }, m: function (a, b) {
                    for (b -= 1; 0 > b;)b += 12;
                    for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() != b;)a.setUTCDate(a.getUTCDate() - 1);
                    return a
                }, d: function (a, b) {
                    return a.setUTCDate(b)
                }
            };
            r.M = r.MM = r.mm = r.m, r.dd = r.d, c = b(c.getFullYear(), c.getMonth(), c.getDate(), 0, 0, 0);
            var s = d.parts.slice();
            if (j.length != s.length && (s = a(s).filter(function (b, c) {
                    return -1 !== a.inArray(c, q)
                }).toArray()), j.length == s.length) {
                for (var m = 0, t = s.length; t > m; m++) {
                    if (n = parseInt(j[m], 10), g = s[m], isNaN(n))switch (g) {
                        case"MM":
                            o = a(k[f].months).filter(function () {
                                var a = this.slice(0, j[m].length), b = j[m].slice(0, a.length);
                                return a == b
                            }), n = a.inArray(o[0], k[f].months) + 1;
                            break;
                        case"M":
                            o = a(k[f].monthsShort).filter(function () {
                                var a = this.slice(0, j[m].length), b = j[m].slice(0, a.length);
                                return a == b
                            }), n = a.inArray(o[0], k[f].monthsShort) + 1
                    }
                    p[g] = n
                }
                for (var u, m = 0; m < q.length; m++)u = q[m], u in p && !isNaN(p[u]) && r[u](c, p[u])
            }
            return c
        },
        formatDate: function (b, c, d) {
            "string" == typeof c && (c = l.parseFormat(c));
            var e = {
                d: b.getUTCDate(),
                D: k[d].daysShort[b.getUTCDay()],
                DD: k[d].days[b.getUTCDay()],
                m: b.getUTCMonth() + 1,
                M: k[d].monthsShort[b.getUTCMonth()],
                MM: k[d].months[b.getUTCMonth()],
                yy: b.getUTCFullYear().toString().substring(2),
                yyyy: b.getUTCFullYear()
            };
            e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m;
            for (var b = [], f = a.extend([], c.separators), g = 0, h = c.parts.length; h >= g; g++)f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
            return b.join("")
        },
        headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="datepicker-switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    l.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + l.headTemplate + "<tbody></tbody>" + l.footTemplate + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + l.headTemplate + l.contTemplate + l.footTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + l.headTemplate + l.contTemplate + l.footTemplate + "</table>" + "</div>" + "</div>", a.fn.datepicker.DPGlobal = l, a.fn.datepicker.noConflict = function () {
        return a.fn.datepicker = g, this
    }, a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (b) {
        var c = a(this);
        c.data("datepicker") || (b.preventDefault(), h.call(c, "show"))
    }), a(function () {
        h.call(a('[data-provide="datepicker-inline"]'))
    })
}(window.jQuery), function (a) {
    "use strict";
    a.fn.bdatepicker = a.fn.datepicker.noConflict(), a.fn.datepicker || (a.fn.datepicker = a.fn.bdatepicker);
    var b = function (a) {
        this.init("date", a, b.defaults), this.initPicker(a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        initPicker: function (b, c) {
            this.options.viewformat || (this.options.viewformat = this.options.format), b.datepicker = a.fn.editableutils.tryParseJson(b.datepicker, !0), this.options.datepicker = a.extend({}, c.datepicker, b.datepicker, {format: this.options.viewformat}), this.options.datepicker.language = this.options.datepicker.language || "en", this.dpg = a.fn.bdatepicker.DPGlobal, this.parsedFormat = this.dpg.parseFormat(this.options.format), this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat)
        }, render: function () {
            this.$input.bdatepicker(this.options.datepicker), this.options.clear && (this.$clear = a('<a href="#"></a>').html(this.options.clear).click(a.proxy(function (a) {
                a.preventDefault(), a.stopPropagation(), this.clear()
            }, this)), this.$tpl.parent().append(a('<div class="editable-clear">').append(this.$clear)))
        }, value2html: function (a, c) {
            var d = a ? this.dpg.formatDate(a, this.parsedViewFormat, this.options.datepicker.language) : "";
            b.superclass.value2html.call(this, d, c)
        }, html2value: function (a) {
            return this.parseDate(a, this.parsedViewFormat)
        }, value2str: function (a) {
            return a ? this.dpg.formatDate(a, this.parsedFormat, this.options.datepicker.language) : ""
        }, str2value: function (a) {
            return this.parseDate(a, this.parsedFormat)
        }, value2submit: function (a) {
            return this.value2str(a)
        }, value2input: function (a) {
            this.$input.bdatepicker("update", a)
        }, input2value: function () {
            return this.$input.data("datepicker").date
        }, activate: function () {
        }, clear: function () {
            this.$input.data("datepicker").date = null, this.$input.find(".active").removeClass("active"), this.options.showbuttons || this.$input.closest("form").submit()
        }, autosubmit: function () {
            this.$input.on("mouseup", ".day", function (b) {
                if (!a(b.currentTarget).is(".old") && !a(b.currentTarget).is(".new")) {
                    var c = a(this).closest("form");
                    setTimeout(function () {
                        c.submit()
                    }, 200)
                }
            })
        }, parseDate: function (a, b) {
            var c, d = null;
            return a && (d = this.dpg.parseDate(a, b, this.options.datepicker.language), "string" == typeof a && (c = this.dpg.formatDate(d, b, this.options.datepicker.language), a !== c && (d = null))), d
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="editable-date well"></div>',
        inputclass: null,
        format: "yyyy-mm-dd",
        viewformat: null,
        datepicker: {weekStart: 0, startView: 0, minViewMode: 0, autoclose: !1},
        clear: "&times; clear"
    }), a.fn.editabletypes.date = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("datefield", a, b.defaults), this.initPicker(a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.date), a.extend(b.prototype, {
        render: function () {
            this.$input = this.$tpl.find("input"), this.setClass(), this.setAttr("placeholder"), this.$tpl.bdatepicker(this.options.datepicker), this.$input.off("focus keydown"), this.$input.keyup(a.proxy(function () {
                this.$tpl.removeData("date"), this.$tpl.bdatepicker("update")
            }, this))
        }, value2input: function (a) {
            this.$input.val(a ? this.dpg.formatDate(a, this.parsedViewFormat, this.options.datepicker.language) : ""), this.$tpl.bdatepicker("update")
        }, input2value: function () {
            return this.html2value(this.$input.val())
        }, activate: function () {
            a.fn.editabletypes.text.prototype.activate.call(this)
        }, autosubmit: function () {
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.date.defaults, {
        tpl: '<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
        inputclass: "input-small",
        datepicker: {weekStart: 0, startView: 0, minViewMode: 0, autoclose: !0}
    }), a.fn.editabletypes.datefield = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("datetime", a, b.defaults), this.initPicker(a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        initPicker: function (b, c) {
            this.options.viewformat || (this.options.viewformat = this.options.format), b.datetimepicker = a.fn.editableutils.tryParseJson(b.datetimepicker, !0), this.options.datetimepicker = a.extend({}, c.datetimepicker, b.datetimepicker, {format: this.options.viewformat}), this.options.datetimepicker.language = this.options.datetimepicker.language || "en", this.dpg = a.fn.datetimepicker.DPGlobal, this.parsedFormat = this.dpg.parseFormat(this.options.format, this.options.formatType), this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat, this.options.formatType)
        }, render: function () {
            this.$input.datetimepicker(this.options.datetimepicker), this.$input.on("changeMode", function () {
                var b = a(this).closest("form").parent();
                setTimeout(function () {
                    b.triggerHandler("resize")
                }, 0)
            }), this.options.clear && (this.$clear = a('<a href="#"></a>').html(this.options.clear).click(a.proxy(function (a) {
                a.preventDefault(), a.stopPropagation(), this.clear()
            }, this)), this.$tpl.parent().append(a('<div class="editable-clear">').append(this.$clear)))
        }, value2html: function (a, c) {
            var d = a ? this.dpg.formatDate(this.toUTC(a), this.parsedViewFormat, this.options.datetimepicker.language, this.options.formatType) : "";
            return c ? (b.superclass.value2html.call(this, d, c), void 0) : d
        }, html2value: function (a) {
            var b = this.parseDate(a, this.parsedViewFormat);
            return b ? this.fromUTC(b) : null
        }, value2str: function (a) {
            return a ? this.dpg.formatDate(this.toUTC(a), this.parsedFormat, this.options.datetimepicker.language, this.options.formatType) : ""
        }, str2value: function (a) {
            var b = this.parseDate(a, this.parsedFormat);
            return b ? this.fromUTC(b) : null
        }, value2submit: function (a) {
            return this.value2str(a)
        }, value2input: function (a) {
            a && this.$input.data("datetimepicker").setDate(a)
        }, input2value: function () {
            var a = this.$input.data("datetimepicker");
            return a.date ? a.getDate() : null
        }, activate: function () {
        }, clear: function () {
            this.$input.data("datetimepicker").date = null, this.$input.find(".active").removeClass("active"), this.options.showbuttons || this.$input.closest("form").submit()
        }, autosubmit: function () {
            this.$input.on("mouseup", ".minute", function () {
                var b = a(this).closest("form");
                setTimeout(function () {
                    b.submit()
                }, 200)
            })
        }, toUTC: function (a) {
            return a ? new Date(a.valueOf() - 6e4 * a.getTimezoneOffset()) : a
        }, fromUTC: function (a) {
            return a ? new Date(a.valueOf() + 6e4 * a.getTimezoneOffset()) : a
        }, parseDate: function (a, b) {
            var c, d = null;
            return a && (d = this.dpg.parseDate(a, b, this.options.datetimepicker.language, this.options.formatType), "string" == typeof a && (c = this.dpg.formatDate(d, b, this.options.datetimepicker.language, this.options.formatType), a !== c && (d = null))), d
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="editable-date well"></div>',
        inputclass: null,
        format: "yyyy-mm-dd hh:ii",
        formatType: "standard",
        viewformat: null,
        datetimepicker: {todayHighlight: !1, autoclose: !1},
        clear: "&times; clear"
    }), a.fn.editabletypes.datetime = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("datetimefield", a, b.defaults), this.initPicker(a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.datetime), a.extend(b.prototype, {
        render: function () {
            this.$input = this.$tpl.find("input"), this.setClass(), this.setAttr("placeholder"), this.$tpl.datetimepicker(this.options.datetimepicker), this.$input.off("focus keydown"), this.$input.keyup(a.proxy(function () {
                this.$tpl.removeData("date"), this.$tpl.datetimepicker("update")
            }, this))
        }, value2input: function (a) {
            this.$input.val(this.value2html(a)), this.$tpl.datetimepicker("update")
        }, input2value: function () {
            return this.html2value(this.$input.val())
        }, activate: function () {
            a.fn.editabletypes.text.prototype.activate.call(this)
        }, autosubmit: function () {
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.datetime.defaults, {
        tpl: '<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
        inputclass: "input-medium",
        datetimepicker: {todayHighlight: !1, autoclose: !0}
    }), a.fn.editabletypes.datetimefield = b
}(window.jQuery);
$.fn.editable.defaults.mode = 'inline';
$(document).ready(function () {
    $('#content').on('shown', function (e, editable) {
        editable.input.$input.summernote({
            minHeight: 700,
            focus: true
        });
        editable.input.$input.code($(this).html());
    });

    $('#title').editable({
        type: 'text',
        pk: pk_name,
        url: api_url,
        title: 'Enter title',
        validate: function (v) {
            if (!v) return 'Required field!';
        }
    });
    $('#content').editable({
        type: 'wysihtml5',
        escape: false,
        pk: pk_name,
        url: api_url,
        title: 'Enter Content',
        rows: 40,
        validate: function (v) {
            if (!v) return 'Required field!';
        }
    });
});