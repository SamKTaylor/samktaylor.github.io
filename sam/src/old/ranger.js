window.bots = function (t) {
    var e = {};

    function r(n) {
        if (e[n]) return e[n].exports;
        var a = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports
    }
    return r.m = t, r.c = e, r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, r.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function (t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var a in t) r.d(n, a, function (e) {
                return t[e]
            }.bind(null, a));
        return n
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 7)
}([function (t, e, r) {
    "use strict";
    r.d(e, "r", (function () {
        return a
    })), r.d(e, "q", (function () {
        return i
    })), r.d(e, "p", (function () {
        return o
    })), r.d(e, "j", (function () {
        return s
    })), r.d(e, "c", (function () {
        return c
    })), r.d(e, "d", (function () {
        return p
    })), r.d(e, "e", (function () {
        return h
    })), r.d(e, "b", (function () {
        return u
    })), r.d(e, "f", (function () {
        return l
    })), r.d(e, "o", (function () {
        return m
    })), r.d(e, "k", (function () {
        return f
    })), r.d(e, "h", (function () {
        return g
    })), r.d(e, "g", (function () {
        return d
    })), r.d(e, "n", (function () {
        return y
    })), r.d(e, "i", (function () {
        return v
    })), r.d(e, "m", (function () {
        return b
    })), r.d(e, "l", (function () {
        return k
    })), r.d(e, "a", (function () {
        return w
    }));
    var n = function (t, e, r, n) {
        return new(r || (r = Promise))((function (a, i) {
            function o(t) {
                try {
                    c(n.next(t))
                } catch (t) {
                    i(t)
                }
            }

            function s(t) {
                try {
                    c(n.throw(t))
                } catch (t) {
                    i(t)
                }
            }

            function c(t) {
                var e;
                t.done ? a(t.value) : (e = t.value, e instanceof r ? e : new r((function (t) {
                    t(e)
                }))).then(o, s)
            }
            c((n = n.apply(t, e || [])).next())
        }))
    };

    function a(t) {
        return new Promise(e => setTimeout(e, t))
    }

    function i(t, e) {
        return "string" == typeof e && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(e) ? new Date(e) : e
    }

    function o(t) {
        return "character" == t.type && ! function (t) {
            return !!t.npc
        }(t)
    }

    function s(t = parent.character.items) {
        const e = [];
        for (let r = 0; r < 42; r++) t[r] && e.push(Object.assign(Object.assign({}, t[r]), {
            index: r
        }));
        return e
    }

    function c(t) {
        for (let e = 0; e < 42; e++)
            if (parent.character.items[e] && parent.character.items[e].name == t) return Object.assign(Object.assign({}, parent.character.items[e]), {
                index: e
            })
    }

    function p(t) {
        const e = [];
        for (let r = 0; r < 42; r++) parent.character.items[r] && parent.character.items[r].name == t && e.push(Object.assign(Object.assign({}, parent.character.items[r]), {
            index: r
        }));
        return e
    }

    function h(t, e) {
        const r = [];
        for (let n = 0; n < 42; n++) parent.character.items[n] && parent.character.items[n].name == t && parent.character.items[n].level == e && r.push(Object.assign(Object.assign({}, parent.character.items[n]), {
            index: n
        }));
        return r
    }

    function u(t, e) {
        let r = t.attack;
        return t.apiercing || (t.apiercing = 0), t.rpiercing || (t.rpiercing = 0), e.armor || (e.armor = 0), !t.damage_type && t.slots.mainhand && (t.damage_type = G.items[t.slots.mainhand.name].damage), e["1hp"] ? [1, 1] : ("physical" == t.damage_type ? r *= damage_multiplier(e.armor - t.apiercing) : "magical" == t.damage_type && (r *= damage_multiplier(e.resistance - t.rpiercing)), [.9 * r, 1.1 * r])
    }

    function l(t, e = !1) {
        if (parent.next_skill && parent.next_skill[t]) {
            const r = parent.next_skill[t].getTime() - Date.now();
            return e ? r + 1 : r < parent.character.ping ? parent.character.ping : r + 1
        }
        return parent.character.ping
    }

    function m(t = parent.character.items) {
        for (let e = 0; e < t.length; e++)
            if (!t[e]) return !1;
        return !0
    }

    function f() {
        const t = new Set;
        for (const e of parent.party_list) t.add(parent.party[e].type);
        return t
    }

    function g(t = parent.character.items) {
        const e = [];
        for (let r = 0; r < t.length; r++) t[r] || e.push(r);
        return e
    }

    function d() {
        if ("bank" != parent.character.map) return;
        const t = [];
        for (const e in parent.character.bank)
            if ("gold" != e)
                for (let r = 0; r < 42; r++) {
                    parent.character.bank[e][r] || t.push({
                        pack: e,
                        index: r
                    })
                }
        return t
    }

    function y(t) {
        const e = G.skills[t].level;
        if (e && e > parent.character.level) return !1;
        if (parent.character.stoned) return !1;
        if (parent.character.rip) return !1;
        const r = G.skills[t].wtype;
        if (r && r != G.items[parent.character.slots.mainhand.name].wtype) return !1;
        if (G.skills[t].slot)
            for (const e of G.skills[t].slot)
                if (parent.character.slots[e[0]].name != e[1]) return !1;
        if (G.skills[t].class) {
            let e = !1;
            for (const r of G.skills[t].class)
                if (r == parent.character.ctype) {
                    e = !0;
                    break
                } if (!e) return !1
        }
        let n = 0;
        if (G.skills[t].mp ? n = G.skills[t].mp : ["attack", "heal"].includes(t) && (n = parent.character.mp_cost), parent.character.mp < n) return !1;
        if (void 0 === parent.next_skill[t]) return !0;
        const a = G.skills[t].share;
        return a ? !parent.next_skill[a] || Date.now() >= parent.next_skill[a].getTime() : Date.now() >= parent.next_skill[t].getTime()
    }

    function v({
        canAttackUsWithoutMoving: t,
        canKillInOneHit: e,
        canMoveTo: r,
        isAttacking: n,
        isAttackingParty: a,
        isAttackingUs: i,
        isCtype: o,
        isMonster: s,
        isMonsterType: c,
        isMoving: p,
        isNPC: h,
        isPartyMember: l,
        isPlayer: m,
        isRIP: f,
        isWithinDistance: g
    }) {
        const d = [],
            y = is_pvp();
        for (const v in parent.entities) {
            const b = parent.entities[v],
                _ = distance(parent.character, b);
            !0 === t && b.range > _ || (!1 === t && b.range <= _ || !0 === e && u(parent.character, b)[0] > b.hp || !1 === e && u(parent.character, b)[0] <= b.hp || (!0 !== r || can_move_to(b.real_x, b.real_y)) && (!1 === r && can_move_to(b.real_x, b.real_y) || (!0 !== n || "monster" != b.type || b.target) && (!1 === n && "monster" == b.type && b.target || (!0 !== n || "character" != b.type || b.target) && (!0 !== a || "monster" != b.type || parent.party_list.includes(b.target)) && (!1 === a && "monster" == b.type && parent.party_list.includes(b.target) || (!0 !== a || "character" != b.type || y) && (!0 === a && "character" == b.type && parent.party_list.includes(v) || !0 === a && "Wizard" == parent.character.name || !0 === i && "monster" == b.type && b.target != parent.character.name || !1 === i && "monster" == b.type && b.target == parent.character.name || (!0 !== i || "character" != b.type || y) && (!0 === i && "character" == b.type && parent.party_list.includes(v) || !0 === i && "Wizard" == parent.character.name || (void 0 === o || b.ctype) && (void 0 !== o && b.ctype != o || !0 === s && "monster" != b.type || !1 === s && "monster" == b.type || (void 0 === c || b.mtype) && (void 0 === c || c.includes(b.mtype)) && (!0 !== p || b.moving) && (!1 === p && b.moving || !0 === h && "character" != b.type || (!0 !== h || "character" != b.type || b.npc) && (!0 !== l || parent.party_list.includes(v)) && (!1 === l && parent.party_list.includes(v) || !0 === m && "character" != b.type || !0 === m && b.npc || (!0 !== f || b.rip) && (!1 === f && b.rip || void 0 !== g && _ > g || d.push(b)))))))))))
        }
        return d
    }

    function b() {
        const t = new Set;
        for (const e in parent.entities) {
            const r = parent.entities[e];
            r.mtype && t.add(r.mtype)
        }
        return t
    }

    function _(t) {
        const e = [];
        for (const r in G.maps) {
            const n = G.maps[r];
            if (!n.instance)
                for (const a of n.monsters || [])
                    if (a.type == t)
                        if (a.boundary) e.push({
                            map: r,
                            x: (a.boundary[0] + a.boundary[2]) / 2,
                            y: (a.boundary[1] + a.boundary[3]) / 2
                        });
                        else if (a.boundaries)
                for (const t of a.boundaries) e.push({
                    map: t[0],
                    x: (t[1] + t[3]) / 2,
                    y: (t[2] + t[4]) / 2
                })
        }
        return e
    }

    function k(t) {
        const e = _(t);
        return e[Math.floor(Math.random() * e.length)]
    }

    function w(t, e = 9, r = 1) {
        return n(this, void 0, void 0, (function* () {
            if (!c("computer")) {
                let t = !1;
                if (!G.maps[parent.character.map].npcs) return;
                for (const e of G.maps[parent.character.map].npcs)
                    if ("merchant" == G.npcs[e.id].role && distance(parent.character, {
                            x: e.position[0],
                            y: e.position[1]
                        }) < 350) {
                        t = !0;
                        break
                    } if (!t) return
            }
            let n = h(t, e);
            n.length >= r || (n = p(t), n.length < Math.min(2, r) && (yield buy_with_gold(t, 1)))
        }))
    }
}, function (t, e, r) {
    "use strict";
    r.d(e, "h", (function () {
        return i
    })), r.d(e, "g", (function () {
        return o
    })), r.d(e, "d", (function () {
        return s
    })), r.d(e, "a", (function () {
        return c
    })), r.d(e, "j", (function () {
        return p
    })), r.d(e, "i", (function () {
        return h
    })), r.d(e, "e", (function () {
        return u
    })), r.d(e, "f", (function () {
        return l
    })), r.d(e, "b", (function () {
        return m
    })), r.d(e, "c", (function () {
        return f
    }));
    var n = r(0),
        a = function (t, e, r, n) {
            return new(r || (r = Promise))((function (a, i) {
                function o(t) {
                    try {
                        c(n.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        c(n.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function c(t) {
                    var e;
                    t.done ? a(t.value) : (e = t.value, e instanceof r ? e : new r((function (t) {
                        t(e)
                    }))).then(o, s)
                }
                c((n = n.apply(t, e || [])).next())
            }))
        };

    function i(t) {
        if ("bank" != parent.character.map) {
            if (!Object(n.c)("computer")) {
                let t = !1;
                if (!G.maps[parent.character.map].npcs) return;
                for (const e of G.maps[parent.character.map].npcs.filter(t => "merchant" == G.npcs[t.id].role))
                    if (distance(parent.character, {
                            x: e.position[0],
                            y: e.position[1]
                        }) < 350) {
                        t = !0;
                        break
                    } if (!t) return
            }
            for (const e of Object(n.j)())
                if (!e.p && t[e.name]) {
                    if (e.level && e.level > t[e.name]) continue;
                    e.q ? sell(e.index, e.q) : sell(e.index, 1)
                }
        }
    }

    function o() {
        const t = Object(n.c)("stand0");
        t && void 0 === parent.character.standed && parent.open_merchant(t.index)
    }

    function s() {
        void 0 !== parent.character.standed && parent.close_merchant()
    }

    function c(t) {
        let e = !1;
        for (const t of parent.npcs)
            if ("secondhands" == t.id && distance(parent.character, {
                    x: t.position[0],
                    y: t.position[1]
                }) < 350) {
                e = !0;
                break
            } if (!e) return;
        let r = 0;
        parent.socket.once("secondhands", e => {
            for (let n = 0; n < e.length; n++)
                if (t.has(e[n].name)) {
                    if (parent.socket.emit("sbuy", {
                            rid: e[n].rid
                        }), ++r >= 5) break
                } else if (e[n].p) {
                if (parent.socket.emit("sbuy", {
                        rid: e[n].rid
                    }), ++r >= 5) break
            } else if (G.items[e[n].name].upgrade && e[n].level >= 8) {
                if (parent.socket.emit("sbuy", {
                        rid: e[n].rid
                    }), ++r >= 5) break
            } else if (G.items[e[n].name].compound && e[n].level >= 4 && (parent.socket.emit("sbuy", {
                    rid: e[n].rid
                }), ++r >= 5)) break
        }), parent.socket.emit("secondhands")
    }

    function p(t, e) {
        const r = parent.entities[t];
        if (!r) return;
        if (distance(parent.character, r) > 400) return;
        const n = new Set(e);
        for (let e = 0; e < parent.character.items.length; e++) {
            const r = parent.character.items[e];
            r && (n.has(r.name) ? n.delete(r.name) : r.q ? send_item(t, e, r.q) : send_item(t, e, 1))
        }
    }

    function h(t, e = 0) {
        if (parent.character.gold <= e) return;
        const r = parent.entities[t];
        r && (distance(parent.character, r) > 400 || send_gold(t, parent.character.gold - e))
    }

    function u(t) {
        return a(this, void 0, void 0, (function* () {
            if ("bank" != parent.character.map) {
                if (!Object(n.c)("computer")) {
                    let t = !1;
                    for (const e of parent.npcs)
                        if ("craftsman" == e.id && distance(parent.character, {
                                x: e.position[0],
                                y: e.position[1]
                            }) < 250) {
                            t = !0;
                            break
                        } if (!t) return
                }
                for (const e in t)
                    if (!(parent.character.gold < G.dismantle[e].cost))
                        for (let r = t[e]; r > 0; r--) {
                            const t = Object(n.e)(e, r);
                            for (const e of t) parent.socket.emit("dismantle", {
                                num: e.index
                            }), yield Object(n.r)(parent.character.ping)
                        }
            }
        }))
    }

    function l(t) {
        if (parent.character.q.exchange) return;
        if ("bank" == parent.character.map) return;
        const e = Object(n.c)("computer"),
            r = [];
        if (!e) {
            for (const t of parent.npcs) t.position && distance(parent.character, {
                x: t.position[0],
                y: t.position[1]
            }) < 250 && r.push(t.id);
            if (!r.length) return
        }
        const a = {};
        for (const t of Object(n.j)()) {
            const e = G.items[t.name],
                r = e.e;
            if (!r || r > t.q) continue;
            let n;
            if ("quest" == e.type) n = e.quest ? G.quests[e.quest].id : "exchange";
            else if ("box" == e.type || "gem" == e.type || "misc" == e.type) n = "exchange";
            else {
                if ("lostearring" != t.name || 2 != t.level) continue;
                n = "pwincess"
            }
            a[n] || (a[n] = []), a[n].push(t)
        }
        for (const t in a) {
            if (!r.includes(t) && !e) continue;
            const n = a[t][0];
            return void exchange(n.index)
        }
    }

    function m() {
        return a(this, void 0, void 0, (function* () {
            if ("bank" == parent.character.map) return;
            if (!Object(n.c)("computer")) {
                let t = !1;
                if (!G.maps[parent.character.map].npcs) return;
                for (const e of G.maps[parent.character.map].npcs.filter(t => "fancypots" == t.id))
                    if (distance(parent.character, {
                            x: e.position[0],
                            y: e.position[1]
                        }) < 350) {
                        t = !0;
                        break
                    } if (!t) return
            }
            if (parent.character.gold < G.items.mpot1.g) return;
            const t = {
                mpot1: 9999,
                hpot1: 9999
            };
            for (const e in t) {
                const r = t[e],
                    a = Object(n.d)(e).reduce((t, e) => t + e.q, 0);
                a < r && (yield buy_with_gold(e, Math.min(r - a, parent.character.gold / G.items[e].g)))
            }
        }))
    }

    function f() {
        return a(this, void 0, void 0, (function* () {
            if ("bank" == parent.character.map) return;
            if (!Object(n.c)("computer")) {
                let t = !1;
                if (!G.maps[parent.character.map].npcs) return;
                for (const e of G.maps[parent.character.map].npcs.filter(t => "scrolls" == t.id))
                    if (distance(parent.character, {
                            x: e.position[0],
                            y: e.position[1]
                        }) < 350) {
                        t = !0;
                        break
                    } if (!t) return
            }
            if (parent.character.gold < G.items.scroll0.g) return;
            const t = {
                scroll0: 1e3,
                scroll1: 100,
                scroll2: 10,
                cscroll0: 1e3,
                cscroll1: 100,
                cscroll2: 10
            };
            for (const e in t) {
                const r = t[e],
                    a = Object(n.d)(e).reduce((t, e) => t + e.q, 0),
                    i = Math.min(r - a, Math.floor(parent.character.gold / G.items[e].g));
                a < r && i > 0 && (yield buy_with_gold(e, i))
            }
        }))
    }
}, function (t, e, r) {
    "use strict";
    (function (t) {
        var e = function (t, e) {
            return t < e
        };

        function n(t) {
            if (!(this instanceof n)) return new n(t);
            this.array = [], this.size = 0, this.compare = t || e
        }
        n.prototype.clone = function () {
            var t = new n(this.compare);
            t.size = this.size;
            for (var e = 0; e < this.size; e++) t.array.push(this.array[e]);
            return t
        }, n.prototype.add = function (t) {
            var e, r, n = this.size;
            for (this.array[this.size] = t, this.size += 1; n > 0 && (e = n - 1 >> 1, r = this.array[e], this.compare(t, r));) this.array[n] = r, n = e;
            this.array[n] = t
        }, n.prototype.heapify = function (t) {
            var e;
            for (this.array = t, this.size = t.length, e = this.size >> 1; e >= 0; e--) this._percolateDown(e)
        }, n.prototype._percolateUp = function (t, e) {
            for (var r, n, a = this.array[t]; t > 0 && (r = t - 1 >> 1, n = this.array[r], e || this.compare(a, n));) this.array[t] = n, t = r;
            this.array[t] = a
        }, n.prototype._percolateDown = function (t) {
            for (var e, r, n, a = this.size, i = this.size >>> 1, o = this.array[t]; t < i && (r = (e = 1 + (t << 1)) + 1, n = this.array[e], r < a && this.compare(this.array[r], n) && (e = r, n = this.array[r]), this.compare(n, o));) this.array[t] = n, t = e;
            this.array[t] = o
        }, n.prototype._removeAt = function (t) {
            if (!(t > this.size - 1 || t < 0)) return this._percolateUp(t, !0), this.poll()
        }, n.prototype.remove = function (t) {
            for (var e = 0; e < this.size; e++)
                if (!this.compare(this.array[e], t) && !this.compare(t, this.array[e])) return this._removeAt(e), !0;
            return !1
        }, n.prototype._batchRemove = function (t, e) {
            var r = new Array(e || this.size),
                n = 0;
            if ("function" == typeof t && this.size)
                for (var a = 0; a < this.size && n < r.length;) t(this.array[a]) ? (r[n] = this._removeAt(a), n++, a >>= 1) : a++;
            return r.length = n, r
        }, n.prototype.removeOne = function (t) {
            var e = this._batchRemove(t, 1);
            return e.length > 0 ? e[0] : void 0
        }, n.prototype.removeMany = function (t, e) {
            return this._batchRemove(t, e)
        }, n.prototype.peek = function () {
            if (0 != this.size) return this.array[0]
        }, n.prototype.poll = function () {
            if (0 != this.size) {
                var t = this.array[0];
                return this.size > 1 ? (this.array[0] = this.array[--this.size], this._percolateDown(0)) : this.size -= 1, t
            }
        }, n.prototype.replaceTop = function (t) {
            if (0 != this.size) {
                var e = this.array[0];
                return this.array[0] = t, this._percolateDown(0), e
            }
        }, n.prototype.trim = function () {
            this.array = this.array.slice(0, this.size)
        }, n.prototype.isEmpty = function () {
            return 0 === this.size
        }, n.prototype.forEach = function (t) {
            if (!this.isEmpty() && "function" == typeof t)
                for (var e = 0, r = this.clone(); !r.isEmpty();) t(r.poll(), e++)
        }, n.prototype.kSmallest = function (t) {
            if (0 == this.size) return [];
            var e = this.compare,
                r = this.array,
                a = new n((function (t, n) {
                    return e(r[t], r[n])
                }));
            t = Math.min(this.size, t);
            var i = new Array(t),
                o = 0;
            for (a.add(0); o < t;) {
                var s = a.poll();
                i[o++] = this.array[s];
                var c = 1 + (s << 1),
                    p = c + 1;
                c < this.size && a.add(c), p < this.size && a.add(p)
            }
            return i
        };
        r.c[r.s] === t && function () {
            var t = new n((function (t, e) {
                return t < e
            }));
            for (t.add(1), t.add(0), t.add(5), t.add(4), t.add(3); !t.isEmpty();) console.log(t.poll())
        }(), t.exports = n
    }).call(this, r(4)(t))
}, function (t, e, r) {
    "use strict";
    r.d(e, "a", (function () {
        return h
    }));
    var n = r(2),
        a = r.n(n),
        i = r(0),
        o = r(1),
        s = function (t, e, r, n) {
            return new(r || (r = Promise))((function (a, i) {
                function o(t) {
                    try {
                        c(n.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        c(n.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function c(t) {
                    var e;
                    t.done ? a(t.value) : (e = t.value, e instanceof r ? e : new r((function (t) {
                        t(e)
                    }))).then(o, s)
                }
                c((n = n.apply(t, e || [])).next())
            }))
        };
    class c {
        constructor() {
            this.TOWN_MOVEMENT_COST = 250, this.DOOR_TOLERANCE = 38, this.TELEPORT_TOLERANCE = 73, this.MOVE_TOLERANCE = 1, this.TOWN_TOLERANCE = 1, this.SLEEP_AFTER_MS = 500, this.SLEEP_FOR_MS = 50, this.FINISH_CHECK_DISTANCE = 200, this.MOVEMENTS = [
                [
                    [0, 25],
                    [0, 5]
                ],
                [
                    [25, 0],
                    [5, 0]
                ],
                [
                    [0, -25],
                    [0, -5]
                ],
                [
                    [-25, 0],
                    [-5, 0]
                ]
            ], this.USE_BLINK = !0, this.MOVE_ON_FAIL = !1, this.SHOW_MESSAGES = !1, this.MESSAGE_COLOR = "#F7600E", this.doorCache = new Map
        }
        isMoving() {
            return null == this.finishedDate && null != this.startDate
        }
        wasCancelled(t) {
            return !this.startDate || t < this.startDate
        }
        stop() {
            this.reset(), parent.character.c.town && stop("town"), stop()
        }
        reset() {
            this.finishedDate = void 0, this.startDate = void 0
        }
        cleanPosition(t) {
            const e = void 0 !== t.real_x ? t.real_x : t.x,
                r = void 0 !== t.real_y ? t.real_y : t.y;
            return {
                map: t.map,
                x: e,
                y: r,
                key: `${t.map}.${e}.${r}`,
                transportS: t.transportS,
                transportMap: t.transportMap,
                transportType: t.transportType
            }
        }
        positionToString(t) {
            return `${t.map}.${t.x}.${t.y}`
        }
        stringToPosition(t) {
            const e = t.split("."),
                r = e[0],
                n = Number.parseFloat(e[1]),
                a = Number.parseFloat(e[2]);
            return {
                map: r,
                x: n,
                real_x: n,
                y: a,
                real_y: a
            }
        }
        findDoorPath(t, e, r = new Set, n = new Set) {
            if (r.add(t), t.map == e.map) {
                const n = distance(t, e),
                    a = [];
                for (const t of r) a.push(t);
                return a.push(e), [n, a]
            }
            const a = [...G.maps[t.map].doors];
            for (const e of G.maps[t.map].npcs)
                if ("transporter" === e.id) {
                    for (const r in G.npcs.transporter.places) r != t.map && a.push([e.position[0], e.position[1], -1, -1, r, G.npcs.transporter.places[r]]);
                    break
                } let i, o = Number.MAX_VALUE;
            for (const s of a) {
                const a = s[4];
                if (n.has(a)) continue;
                if (s[7] || s[8]) continue;
                const c = {
                        map: t.map,
                        x: s[0],
                        y: s[1],
                        key: `${t.map}.${s[0]}.${s[1]}`,
                        transportS: s[5],
                        transportMap: a,
                        transportType: -1 == s[3] ? "teleport" : "door"
                    },
                    p = {
                        map: a,
                        x: G.maps[a].spawns[s[5]][0],
                        y: G.maps[a].spawns[s[5]][1],
                        key: `${a}.${G.maps[a].spawns[s[5]][0]}.${G.maps[a].spawns[s[5]][1]}`
                    },
                    h = new Set(n);
                h.add(a);
                const u = new Set(r);
                u.add(c);
                const l = distance(t, c) + 50;
                if (o < l) continue;
                const [m, f] = this.findDoorPath(p, e, u, h);
                o > m + l && (o = m + l, i = f)
            }
            return [o, i]
        }
        heuristic(t, e) {
            return distance(t, e)
        }
        smoothPath(t) {
            let e = [];
            e.push(t[0]);
            for (let r = 0; r < t.length - 1; r++) {
                const n = t[r];
                if ("town" == n.transportType) {
                    e.push(n);
                    break
                }
                let a = r + 1;
                for (let e = r + 1; e < t.length; e++) {
                    const i = t[e];
                    can_move({
                        map: n.map,
                        x: i.x,
                        y: i.y,
                        going_x: n.x,
                        going_y: n.y,
                        base: parent.character.base
                    }) && (a = e, r = e - 1)
                }
                a > 0 && e.push(t[a])
            }
            return e = e.reverse(), e
        }
        reconstructPath(t, e, r) {
            const n = [];
            for (n.push({
                    map: e.map,
                    x: e.x,
                    real_x: e.x,
                    y: e.y,
                    real_y: e.y,
                    key: `${e.map}.${e.x}.${e.y}`,
                    transportMap: e.transportMap,
                    transportType: e.transportType,
                    transportS: e.transportS
                }); t;) n.push({
                map: t.map,
                x: t.x,
                real_x: t.x,
                y: t.y,
                real_y: t.y,
                key: `${t.map}.${t.x}.${t.y}`,
                transportMap: t.transportMap,
                transportType: t.transportType,
                transportS: t.transportS
            }), t = r.get(t.key);
            return this.smoothPath(n)
        }
        smartMove(t, e = 0) {
            return s(this, void 0, void 0, (function* () {
                this.reset(), this.startDate = new Date;
                let r = [];
                const n = Date.now();
                this.SHOW_MESSAGES && game_log("a* - start searching", this.MESSAGE_COLOR);
                const a = this.findDoorPath(this.cleanPosition(parent.character), this.cleanPosition(t))[1];
                for (let t = 0; t < a.length; t += 2) {
                    const n = a[t],
                        i = a[t + 1],
                        o = `${n.key}_${i.key}`;
                    let s;
                    this.doorCache.has(o) ? s = this.doorCache.get(o) : (s = "door" == i.transportType ? yield this.getMovements(n, i, this.DOOR_TOLERANCE): "teleport" == i.transportType ? yield this.getMovements(n, i, this.TELEPORT_TOLERANCE): yield this.getMovements(n, i, e), this.doorCache.set(o, s)), r = r.concat(s)
                }
                this.SHOW_MESSAGES && game_log(`a* - finish searching (${((Date.now()-n)/1e3).toFixed(1)} s)`, this.MESSAGE_COLOR);
                let i = 0;
                const o = new Promise((t, e) => {
                    const n = a => {
                        if (this.wasCancelled(a)) return stop(), e("a* - cancelled moving");
                        const o = r[i];
                        if (distance(parent.character, r[r.length - 1]) < this.MOVE_TOLERANCE) return this.SHOW_MESSAGES && game_log("a* - done moving", this.MESSAGE_COLOR), this.finishedDate = new Date, void t();
                        if (parent.character.moving || is_transporting(parent.character) || !can_walk(parent.character));
                        else {
                            if (o.map == parent.character.map && this.USE_BLINK && can_use("blink") && distance(parent.character, o) > this.TOWN_MOVEMENT_COST && parent.character.mp > G.skills.blink.mp) {
                                let t = i;
                                for (; t < r.length && r[t].map === parent.character.map; t++);
                                return i = t - 1, setTimeout(() => {
                                    n(a)
                                }, 900), void use_skill("blink", [r[i].x, r[i].y])
                            }
                            if (o.map == parent.character.map && "town" == o.transportType) return distance(parent.character, o) < this.TOWN_TOLERANCE ? (i += 1, void n(a)) : (setTimeout(() => {
                                n(a)
                            }, 900), void use_skill("town"));
                            if (parent.character.map != o.map || !can_move_to(o.x, o.y)) {
                                if (this.SHOW_MESSAGES && game_log("a* - failed moving", this.MESSAGE_COLOR), this.MOVE_ON_FAIL) {
                                    const t = 2 * Math.random() - 1,
                                        e = 2 * Math.random() - 1;
                                    move(parent.character.real_x + t, parent.character.real_y + e)
                                }
                                return this.reset(), e("failed moving")
                            }
                            if (distance(parent.character, o) < this.MOVE_TOLERANCE) {
                                if ("door" != o.transportType && "teleport" != o.transportType) return i += 1, void n(a);
                                if (parent.character.map == o.map) return transport(o.transportMap, o.transportS), i += 1, void setTimeout(() => {
                                    n(a)
                                }, 100)
                            } else move(o.x, o.y)
                        }
                        setTimeout(() => {
                            n(a)
                        }, 40)
                    };
                    this.SHOW_MESSAGES && game_log("a* - start moving", this.MESSAGE_COLOR), n(this.startDate)
                });
                return yield o
            }))
        }
        getMovements(t, e, r = 0, n = this.startDate) {
            return s(this, void 0, void 0, (function* () {
                const o = this.cleanPosition(t),
                    s = this.cleanPosition(e),
                    c = new Map,
                    p = new Map;
                p.set(o.key, 0);
                const h = new Map;
                h.set(o.key, this.heuristic(o, s));
                const u = new a.a((t, e) => h.get(t.key) < h.get(e.key));
                u.add(Object.assign({}, o));
                const l = new Set,
                    m = this.cleanPosition({
                        map: o.map,
                        x: G.maps[o.map].spawns[0][0],
                        y: G.maps[o.map].spawns[0][1],
                        transportType: "town"
                    }),
                    f = p.get(o.key) + this.TOWN_MOVEMENT_COST;
                m.key !== o.key && (!p.get(m.key) || f < p.get(m.key)) && (c.set(m.key, o), p.set(m.key, f), h.set(m.key, f + this.heuristic(m, s)), l.has(m.key) || (l.add(m.key), u.add(m)));
                let g = Date.now();
                for (; u.size;) {
                    const t = u.poll();
                    l.delete(t.key);
                    const e = distance(t, s);
                    if (e < r) {
                        const e = this.reconstructPath(t, Object.assign(Object.assign({}, t), {
                            transportType: s.transportType,
                            transportMap: s.transportMap,
                            transportS: s.transportS
                        }), c);
                        return Promise.resolve(e)
                    }
                    if (e < r + this.FINISH_CHECK_DISTANCE)
                        if (0 == r) {
                            if (can_move({
                                    map: t.map,
                                    x: t.x,
                                    y: t.y,
                                    going_x: s.x,
                                    going_y: s.y,
                                    base: parent.character.base
                                })) {
                                const e = this.reconstructPath(t, s, c);
                                return Promise.resolve(e)
                            }
                        } else {
                            const e = Math.atan2(t.y - s.y, t.x - s.x),
                                n = s.x + Math.cos(e) * r,
                                a = s.y + Math.sin(e) * r,
                                i = {
                                    map: s.map,
                                    x: n,
                                    y: a,
                                    key: this.positionToString({
                                        x: n,
                                        y: a,
                                        map: s.map
                                    }),
                                    transportMap: s.transportMap,
                                    transportType: s.transportType,
                                    transportS: s.transportS
                                };
                            if (can_move({
                                    map: t.map,
                                    x: t.x,
                                    y: t.y,
                                    going_x: i.x,
                                    going_y: i.y,
                                    base: parent.character.base
                                })) {
                                const e = this.reconstructPath(t, i, c);
                                return Promise.resolve(e)
                            }
                        } for (const e of this.MOVEMENTS)
                        for (const r of e) {
                            const e = this.cleanPosition({
                                map: t.map,
                                x: Math.trunc(t.x + r[0]),
                                y: Math.trunc(t.y + r[1])
                            });
                            if (can_move({
                                    map: t.map,
                                    x: t.x,
                                    y: t.y,
                                    going_x: e.x,
                                    going_y: e.y,
                                    base: parent.character.base
                                })) {
                                const n = p.get(t.key) + Math.abs(r[0]) + Math.abs(r[1]);
                                (!p.has(e.key) || n < p.get(e.key)) && (c.set(e.key, t), p.set(e.key, n), h.set(e.key, n + this.heuristic(e, s)), l.has(e.key) || (l.add(e.key), u.add(e)))
                            }
                        }
                    if (Date.now() - g > this.SLEEP_AFTER_MS && (yield Object(i.r)(this.SLEEP_FOR_MS), g = Date.now(), this.wasCancelled(n))) return Promise.reject("cancelled")
                }
                this.SHOW_MESSAGES && game_log("a* - failed searching", this.MESSAGE_COLOR);
                try {
                    let t, e = Number.MAX_VALUE;
                    for (const [r, n] of h) {
                        const a = p.get(r);
                        n - a < e && (e = n - a, t = r)
                    }
                    const r = this.stringToPosition(t),
                        n = this.reconstructPath(r, s, c);
                    return Promise.resolve(n)
                } catch (t) {
                    return Promise.reject("Failed to find a path...")
                }
            }))
        }
    }
    var p = function (t, e, r, n) {
        return new(r || (r = Promise))((function (a, i) {
            function o(t) {
                try {
                    c(n.next(t))
                } catch (t) {
                    i(t)
                }
            }

            function s(t) {
                try {
                    c(n.throw(t))
                } catch (t) {
                    i(t)
                }
            }

            function c(t) {
                var e;
                t.done ? a(t.value) : (e = t.value, e instanceof r ? e : new r((function (t) {
                    t(e)
                }))).then(o, s)
            }
            c((n = n.apply(t, e || [])).next())
        }))
    };
    class h {
        constructor() {
            this.astar = new c, this.itemsToKeep = ["computer", "tracker", "goldbooster", "luckbooster", "xpbooster", "hpot1", "mpot1", "jacko", "lantern"], this.itemsToSell = {
                shoes: 2,
                pants: 2,
                coat: 2,
                helmet: 2,
                gloves: 2,
                cclaw: 2,
                hpamulet: 1,
                hpbelt: 1,
                maceofthedead: 2,
                ringsj: 1,
                slimestaff: 2,
                spear: 2,
                throwingstars: 2,
                vitearring: 1,
                vitring: 1
            }, this.itemsToDismantle = {}, this.itemsToExchange = new Set(["5bucks", "gem0", "gem1", "seashell", "leather", "candycane", "mistletoe", "ornament", "candy0", "candy1", "redenvelopev3", "basketofeggs", "armorbox", "bugbountybox", "gift0", "gift1", "mysterybox", "weaponbox", "xbox"]), this.itemsToBuy = new Set([...this.itemsToExchange, "dexbelt", "intbelt", "strbelt", "ctristone", "dexring", "intring", "ringofluck", "strring", "suckerpunch", "tristone", "dexearring", "intearring", "lostearring", "strearring", "amuletofm", "dexamulet", "intamulet", "snring", "stramulet", "t2dexamulet", "t2intamulet", "t2stramulet", "charmer", "ftrinket", "jacko", "orbg", "orbofdex", "orbofint", "orbofsc", "orbofstr", "rabbitsfoot", "talkingskull", "t2quiver", "lantern", "mshield", "quiver", "xshield", "angelwings", "bcape", "cape", "ecape", "stealthcape", "hboots", "mrnboots", "mwboots", "shoes1", "wingedboots", "xboots", "hpants", "mrnpants", "mwpants", "pants1", "starkillers", "xpants", "cdragon", "coat1", "harmor", "mcape", "mrnarmor", "mwarmor", "tshirt0", "tshirt1", "tshirt2", "tshirt3", "tshirt4", "tshirt6", "tshirt7", "tshirt8", "tshirt88", "tshirt9", "warpvest", "xarmor", "eears", "fury", "helmet1", "hhelmet", "mrnhat", "mwhelmet", "partyhat", "rednose", "xhelmet", "gloves1", "goldenpowerglove", "handofmidas", "hgloves", "mrngloves", "mwgloves", "poker", "powerglove", "xgloves", "basher", "bataxe", "bowofthedead", "candycanesword", "carrotsword", "crossbow", "dartgun", "firebow", "frostbow", "froststaff", "gbow", "harbringer", "hbow", "merry", "oozingterror", "ornamentstaff", "pmace", "t2bow", "t3bow", "wblade", "ascale", "bfur", "cscale", "electronics", "feather0", "fireblade", "goldenegg", "goldingot", "goldnugget", "leather", "networkcard", "platinumingot", "platinumnugget", "pleather", "snakefang", "x0", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "egg0", "egg1", "egg2", "egg3", "egg4", "egg5", "egg6", "egg7", "egg8", "essenceofether", "essenceoffire", "essenceoffrost", "essenceoflife", "essenceofnature", "bunnyelixir", "candypop", "elixirdex0", "elixirdex1", "elixirdex2", "elixirint0", "elixirint1", "elixirint2", "elixirluck", "elixirstr0", "elixirstr1", "elixirstr2", "greenbomb", "hotchocolate", "cscroll3", "scroll3", "scroll4", "bottleofxp", "bugbountybox", "monstertoken", "poison", "snakeoil"]), this.holdPosition = !1, this.holdAttack = !1
        }
        mainLoop() {
            return p(this, void 0, void 0, (function* () {
                try {
                    if ("merchant" != parent.character.ctype && (this.equipBetterItems(), this.getMonsterhuntQuest(), yield Object(o.b)()), this.getNewYearTreeBuff(), Object(o.e)(this.itemsToDismantle), null == parent.character.slots.elixir) {
                        const t = Object(i.d)("candypop");
                        t.length && equip(t[0].index)
                    }
                    for (const t of Object(i.i)({
                            isCtype: "merchant",
                            isWithinDistance: 400
                        }))
                        for (const e in t.slots) {
                            const r = t.slots[e];
                            r && (r.giveaway && (r.list.includes(parent.character.id) || parent.socket.emit("join_giveaway", {
                                slot: e,
                                id: t.id,
                                rid: r.rid
                            })))
                        }
                    for (const t of Object(i.i)({
                            isCtype: "merchant",
                            isWithinDistance: 400
                        }))
                        for (const e in t.slots) {
                            const r = t.slots[e];
                            if (r && (!r.b && r.rid && this.itemsToBuy.has(r.name) && !(r.price > 2 * G.items[r.name].g || parent.character.gold < r.price)))
                                if (r.q) {
                                    const n = Math.min(r.q, Math.floor(parent.character.gold / r.price));
                                    parent.socket.emit("trade_buy", {
                                        slot: e,
                                        id: t.id,
                                        rid: r.rid,
                                        q: n
                                    })
                                } else parent.socket.emit("trade_buy", {
                                    slot: e,
                                    id: t.id,
                                    rid: r.rid,
                                    q: 1
                                })
                        }
                    this.loot()
                } catch (t) {
                    console.error(t)
                }
                setTimeout(() => {
                    this.mainLoop()
                }, Math.max(250, parent.character.ping))
            }))
        }
        run() {
            this.healLoop(), this.attackLoop(), this.scareLoop(), this.moveLoop(), this.infoLoop(), this.mainLoop()
        }
        infoLoop() {
            const t = JSON.parse(sessionStorage.getItem("party"), i.q) || {};
            t[parent.character.name] = {
                lastSeen: new Date,
                shouldSwitchServer: this.shouldSwitchServer(),
                monsterHuntTargets: this.getMonsterHuntTargets(),
                items: Object(i.j)(),
                attack: parent.character.attack,
                frequency: parent.character.frequency,
                goldm: parent.character.goldm,
                last_ms: parent.character.last_ms,
                luckm: parent.character.luckm,
                map: parent.character.map,
                x: parent.character.real_x,
                y: parent.character.real_y,
                s: parent.character.s
            }, sessionStorage.setItem("party", JSON.stringify(t));
            const e = JSON.parse(sessionStorage.getItem("players"), i.q) || {};
            let r = !1;
            for (const t of Object(i.i)({
                    isPlayer: !0,
                    isPartyMember: !1
                })) e[t.id] = {
                lastSeen: new Date,
                rip: t.rip,
                map: t.map,
                x: t.real_x,
                y: t.real_y,
                s: t.s,
                ctype: t.ctype
            }, r = !0;
            r && sessionStorage.setItem("players", JSON.stringify(e));
            const n = JSON.parse(sessionStorage.getItem("npcs"), i.q) || {};
            r = !1;
            for (const t of ["Angel", "Kane"]) parent.entities[t] && (n[t] = {
                lastSeen: new Date,
                map: parent.entities[t].map,
                x: parent.entities[t].real_x,
                y: parent.entities[t].real_y
            }, r = !0);
            r && sessionStorage.setItem("npcs", JSON.stringify(n));
            const a = JSON.parse(sessionStorage.getItem("monsters"), i.q) || {};
            r = !1;
            for (const t of Object(i.i)({
                    isMonster: !0
                }))["fvampire", "goldenbat", "mvampire", "phoenix", "pinkgoo", "snowman", "wabbit"].includes(t.mtype) && (a[t.mtype] = {
                lastSeen: new Date,
                id: t.id,
                x: t.real_x,
                y: t.real_y,
                map: t.map
            }, r = !0);
            r && sessionStorage.setItem("monsters", JSON.stringify(a)), setTimeout(() => {
                this.infoLoop()
            }, 2e3)
        }
        getMonsterHuntTargets() {
            const t = [];
            let e = Number.MAX_VALUE;
            const r = JSON.parse(sessionStorage.getItem("party"), i.q) || {};
            for (const n of parent.party_list) {
                const a = r[n];
                if (!a) continue;
                if (!a.s.monsterhunt || 0 == a.s.monsterhunt.c) continue;
                if (!this.targetPriority[a.s.monsterhunt.id]) continue;
                const o = this.targetPriority[a.s.monsterhunt.id].coop;
                if (o) {
                    const t = Object(i.k)();
                    if (o.filter(e => !t.has(e)).length) continue
                }
                const s = a.s.monsterhunt.ms - (Date.now() - new Date(a.last_ms).getTime());
                s < e ? (e = s, t.unshift(a.s.monsterhunt.id)) : t.push(a.s.monsterhunt.id)
            }
            return t
        }
        shouldSwitchServer() {
            if ("merchant" == parent.character.ctype) return !0;
            if (!parent.character.s.monsterhunt) return !1;
            if (0 == parent.character.s.monsterhunt.c) return !1;
            if (this.getMonsterHuntTargets().length) return !1;
            for (const t in parent.S)
                if ("grinch" != t && !(parent.S[t].hp / parent.S[t].max_hp > .9) && parent.S[t].live && this.targetPriority[t]) return !1;
            return !0
        }
        loot() {
            let t = 0;
            const e = JSON.parse(sessionStorage.getItem("party"), i.q) || {};
            for (const r in parent.chests) {
                const n = parent.chests[r];
                if (distance(parent.character, n) > 800) continue;
                let a = !0;
                for (const t of parent.party_list) {
                    if (t == parent.character.id) continue;
                    const r = parent.entities[t];
                    if (r && (!(distance(r, n) > 800) && e[t])) {
                        if (["chest3", "chest4"].includes(n.skin)) {
                            if (parent.character.goldm >= e[t].goldm) continue
                        } else if (parent.character.luckm >= e[t].luckm) continue;
                        a = !1;
                        break
                    }
                }
                if (a && (parent.socket.emit("open_chest", {
                        id: r
                    }), ++t > 10)) break
            }
        }
        attackLoop() {
            return p(this, void 0, void 0, (function* () {
                try {
                    const t = this.getTargets(1);
                    t.length && this.wantToAttack(t[0]) && (yield attack(t[0]), reduce_cooldown("attack", Math.min(...parent.pings)))
                } catch (t) {
                    return "cooldown" == t.reason ? void setTimeout(() => {
                        this.attackLoop()
                    }, Math.min(...parent.pings) - t.remaining) : (["not_found", "disabled"].includes(t.reason) || console.error(t), void setTimeout(() => {
                        this.attackLoop()
                    }, Object(i.f)("attack")))
                }
                setTimeout(() => {
                    this.attackLoop()
                }, Object(i.f)("attack", !0))
            }))
        }
        scareLoop() {
            try {
                const t = Object(i.i)({
                    isAttackingUs: !0,
                    isMonster: !0,
                    isRIP: !1
                });
                let e = !1;
                if (t.length >= 3) e = !0;
                else if (t.length && !this.targetPriority[t[0].mtype]) e = !0;
                else if (parent.character.c.town && (t.length > 1 || 1 == t.length && distance(t[0], parent.character) - t[0].range - 2 * t[0].speed)) e = !0;
                else
                    for (const r of t)
                        if (!(distance(r, parent.character) > r.range || 6 * Object(i.b)(r, parent.character)[1] * r.frequency <= parent.character.hp)) {
                            e = !0;
                            break
                        } if (!Object(i.n)("scare") || !e) return void setTimeout(() => {
                    this.scareLoop()
                }, Object(i.f)("scare"));
                if ("jacko" == parent.character.slots.orb.name) use_skill("scare"), reduce_cooldown("scare", Math.min(...parent.pings));
                else {
                    const t = Object(i.d)("jacko");
                    if (t.length) {
                        const e = t[0].index;
                        equip(e), use_skill("scare"), reduce_cooldown("scare", Math.min(...parent.pings))
                    }
                }
            } catch (t) {
                console.error(t)
            }
            setTimeout(() => {
                this.scareLoop()
            }, Object(i.f)("scare"))
        }
        getMovementLocation(t) {
            if (!this.targetPriority[t]) return;
            if (this.targetPriority[t].farmingPosition && this.targetPriority[t].holdPositionFarm) return this.targetPriority[t].farmingPosition;
            if (Object(i.m)().has(t)) return;
            if (this.targetPriority[t].farmingPosition) return distance(parent.character, this.targetPriority[t].farmingPosition) < 300 ? void 0 : this.targetPriority[t].farmingPosition;
            if (parent.S[t]) {
                if (!parent.S[t].live) return;
                return parent.S[t]
            }
            const e = Object(i.l)(t);
            return e || void 0
        }
        getMovementTarget() {
            if (parent.character.rip) return void set_message("RIP");
            if (parent.character.s.monsterhunt && 0 == parent.character.s.monsterhunt.c) return set_message("Finish MH"), {
                target: "monsterhunter",
                position: G.maps.main.ref.monsterhunter,
                range: 300
            };
            for (const t of Object(i.i)({
                    isMonster: !0,
                    isRIP: !1
                }))
                if (("goldenbat" == t.mtype || "phoenix" == t.mtype) && this.targetPriority[t.mtype]) return set_message(t.mtype), {
                    target: t.mtype,
                    position: t,
                    range: parent.character.range
                };
            const t = JSON.parse(sessionStorage.getItem("monsters"), i.q) || {};
            for (const e in t) {
                if (!this.targetPriority[e]) continue;
                const r = t[e],
                    n = parent.entities[r.id];
                if (n && (r.x = n.real_x, r.y = n.real_y), !(distance(parent.character, r) < 100) || n) return set_message("SP " + e), {
                    target: e,
                    position: r,
                    range: parent.character.range
                };
                delete t[e], sessionStorage.setItem("monsters", JSON.stringify(t))
            }
            if (G.maps.main.ref.newyear_tree && !parent.character.s.holidayspirit) return set_message("Xmas Tree"), {
                target: "newyear_tree",
                position: G.maps.main.ref.newyear_tree,
                range: 300
            };
            if (Object(i.o)()) return set_message("Full!"), {
                target: "merchant",
                position: {
                    map: "main",
                    x: 60,
                    y: -325
                },
                range: 300
            };
            for (const t in parent.S)
                if (parent.S[t].live && this.targetPriority[t]) return set_message(t), {
                    target: t,
                    position: parent.S[t],
                    range: parent.character.range
                };
            const e = JSON.parse(sessionStorage.getItem("party"), i.q) || {},
                r = this.getMonsterHuntTargets();
            if (r.length) {
                const t = r[0],
                    n = this.targetPriority[t].coop;
                if (!n) return set_message("MH " + t), {
                    target: t,
                    position: this.getMovementLocation(t)
                }; {
                    const r = new Set;
                    for (const n of parent.party_list) e[n] && e[n].monsterHuntTargets && e[n].monsterHuntTargets[0] == t && r.add(parent.party[n].type);
                    if (0 == n.filter(t => !r.has(t)).length) return set_message("MH " + t), {
                        target: t,
                        position: this.getMovementLocation(t)
                    }
                }
            }
            return parent.character.s.monsterhunt ? this.mainTarget ? (set_message(this.mainTarget), {
                target: this.mainTarget,
                position: this.getMovementLocation(this.mainTarget)
            }) : void 0 : (set_message("New MH"), {
                target: "monsterhunter",
                position: G.maps.main.ref.monsterhunter,
                range: 300
            })
        }
        moveLoop() {
            try {
                if (this.holdPosition || smart.moving) return void setTimeout(() => {
                    this.moveLoop()
                }, Math.max(400, parent.character.ping));
                const t = this.movementTarget;
                if (this.movementTarget = this.getMovementTarget(), this.movementTarget && this.movementTarget.position) {
                    if (!t || this.movementTarget.target != t.target || t.position && this.movementTarget.position.map != t.position.map) return this.astar.stop(), this.astar.smartMove(this.movementTarget.position, this.movementTarget.range), void setTimeout(() => {
                        this.moveLoop()
                    }, Math.max(400, parent.character.ping));
                    if (!this.astar.isMoving()) return this.astar.smartMove(this.movementTarget.position, this.movementTarget.range), void setTimeout(() => {
                        this.moveLoop()
                    }, Math.max(400, parent.character.ping))
                }
                const e = this.getTargets(1);
                e.length && e[0].mtype == this.movementTarget.target && this.targetPriority[e[0].mtype] && !this.targetPriority[e[0].mtype].holdPositionFarm && this.astar.stop();
                const r = get_targeted_monster();
                if (r && r.rip && (change_target(null, !0), this.astar.stop()), this.astar.isMoving()) return void setTimeout(() => {
                    this.moveLoop()
                }, Math.max(400, parent.character.ping));
                if (this.targetPriority[this.movementTarget.target] && this.targetPriority[this.movementTarget.target].holdPositionFarm) return void setTimeout(() => {
                    this.moveLoop()
                }, Math.max(400, parent.character.ping));
                const n = [],
                    a = [],
                    o = [],
                    s = [],
                    c = [],
                    p = [],
                    h = [],
                    u = [];
                for (const t in parent.entities) {
                    const e = parent.entities[t];
                    if (e.rip) continue;
                    if (!this.targetPriority[e.mtype]) continue;
                    const r = distance(parent.character, e),
                        l = Math.max(e.range + e.speed, 50);
                    l < parent.character.range && r < l && (e.hp > Object(i.b)(parent.character, e)[0] || this.targetPriority[e.mtype].holdAttackInEntityRange || e.target == parent.character.name) && n.push(e), !e.target && r < 50 && a.push(e), r < parent.character.range ? (o.push(e), this.movementTarget.target == e.mtype && s.push(e)) : r < 2 * parent.character.range && (c.push(e), this.movementTarget.target == e.mtype && p.push(e)), h.push(e), this.movementTarget.target == e.mtype && u.push(e)
                }
                if (n.length) {
                    const t = {
                        x: 0,
                        y: 0
                    };
                    let e = 0;
                    for (const r of n) t.x += r.real_x, t.y += r.real_y, r.range + r.speed > e && (e = r.range + r.speed);
                    t.x /= n.length, t.y /= n.length;
                    const r = Math.atan2(parent.character.real_y - t.y, parent.character.real_x - t.x),
                        a = Math.min(parent.character.range, 1.5 * e),
                        i = (t, e) => {
                            const r = Math.cos(t) * e,
                                n = Math.sin(t) * e;
                            return {
                                x: parent.character.real_x + r,
                                y: parent.character.real_y + n
                            }
                        };
                    let o = i(r, a),
                        s = 0;
                    for (; !can_move_to(o.x, o.y) && s < 180;) s = s <= 0 ? 1 - s : -s, o = i(r + s * Math.PI / 180, a);
                    return move(o.x, o.y), void setTimeout(() => {
                        this.moveLoop()
                    }, Math.max(400, parent.character.ping))
                }
                if (s.length) return void setTimeout(() => {
                    this.moveLoop()
                }, Math.max(400, parent.character.ping));
                if (u.length) {
                    let t, e = Number.MAX_VALUE;
                    for (const r of u) {
                        const n = distance(parent.character, r);
                        n < e && (e = n, t = r)
                    }
                    return this.astar.smartMove(t, parent.character.range), void setTimeout(() => {
                        this.moveLoop()
                    }, Math.max(400, parent.character.ping))
                }
                if (h.length) {
                    let t, e = Number.MAX_VALUE;
                    for (const r of h) {
                        const n = distance(parent.character, r);
                        n < e && (e = n, t = r)
                    }
                    return this.astar.smartMove(t, parent.character.range), void setTimeout(() => {
                        this.moveLoop()
                    }, Math.max(400, parent.character.ping))
                }
            } catch (t) {
                console.error(t)
            }
            setTimeout(() => {
                this.moveLoop()
            }, Math.max(400, parent.character.ping))
        }
        healLoop() {
            return p(this, void 0, void 0, (function* () {
                try {
                    if (parent.character.rip) return respawn(), void setTimeout(() => {
                        this.healLoop()
                    }, Object(i.f)("use_town"));
                    if (!Object(i.n)("use_hp")) return void setTimeout(() => {
                        this.healLoop()
                    }, Object(i.f)("use_hp"));
                    const t = ["hpot0", "hpot1"],
                        e = ["mpot0", "mpot1"];
                    let r = null,
                        n = null;
                    for (let a = parent.character.items.length - 1; a >= 0; a--) {
                        const i = parent.character.items[a];
                        if (i && (!n && t.includes(i.name) ? n = i : !r && e.includes(i.name) && (r = i), n && r)) break
                    }
                    const a = parent.character.hp / parent.character.max_hp,
                        o = parent.character.mp / parent.character.max_mp;
                    a <= o && 1 != a && (!n || "hpot0" == n.name && (parent.character.hp <= parent.character.max_hp - 200 || parent.character.hp < 50) || "hpot1" == n.name && (parent.character.hp <= parent.character.max_hp - 400 || parent.character.hp < 50)) ? (use_skill("use_hp"), reduce_cooldown("use_hp", Math.min(...parent.pings)), reduce_cooldown("use_mp", Math.min(...parent.pings))) : 1 != o && (!r || "mpot0" == r.name && (parent.character.mp <= parent.character.max_mp - 300 || parent.character.mp < 50) || "mpot1" == r.name && (parent.character.mp <= parent.character.max_mp - 500 || parent.character.mp < 50)) ? (use_skill("use_mp"), reduce_cooldown("use_hp", Math.min(...parent.pings)), reduce_cooldown("use_mp", Math.min(...parent.pings))) : a < o ? (use_skill("regen_hp"), reduce_cooldown("use_hp", Math.min(...parent.pings)), reduce_cooldown("use_mp", Math.min(...parent.pings))) : o < a && (use_skill("regen_mp"), reduce_cooldown("use_hp", Math.min(...parent.pings)), reduce_cooldown("use_mp", Math.min(...parent.pings)))
                } catch (t) {
                    console.error(t)
                }
                setTimeout(() => {
                    this.healLoop()
                }, Object(i.f)("use_hp"))
            }))
        }
        getNewYearTreeBuff() {
            G.maps.main.ref.newyear_tree && (parent.character.s.holidayspirit || distance(parent.character, G.maps.main.ref.newyear_tree) > 400 || parent.socket.emit("interaction", {
                type: "newyear_tree"
            }))
        }
        getMonsterhuntQuest() {
            distance(parent.character, G.maps.main.ref.monsterhunter) > 400 || (parent.character.s.monsterhunt ? 0 == parent.character.s.monsterhunt.c && parent.socket.emit("monsterhunt") : parent.socket.emit("monsterhunt"))
        }
        parseCM(t, e) {
            if (parent.party_list.includes(t) || parent.character.name == t || ["earthiverse", "earthMag", "earthMag2"].includes(t) || "monster" == e.message) {
                if ("info" == e.message) {
                    const r = JSON.parse(sessionStorage.getItem("party"), i.q) || {};
                    r[t] = e.info, sessionStorage.setItem("party", JSON.stringify(r))
                } else if ("monster" == e.message) {
                    const t = JSON.parse(sessionStorage.getItem("monsters"), i.q) || {};
                    t[e.id] = e.info, sessionStorage.setItem("monsters", JSON.stringify(t))
                } else if ("npc" == e.message) {
                    const t = JSON.parse(sessionStorage.getItem("npcs"), i.q) || {};
                    t[e.id] = e.info, sessionStorage.setItem("npcs", JSON.stringify(t))
                } else if ("player" == e.message) {
                    const t = JSON.parse(sessionStorage.getItem("players"), i.q) || {};
                    t[e.id] = e.info, sessionStorage.setItem("players", JSON.stringify(t))
                } else if ("chests" == e.message)
                    for (const t in e.chests) parent.chests[t] || (parent.chests[t] = e.chests[t])
            } else game_log("Blocked CM from " + t)
        }
        equipBetterItems() {
            try {
                const t = Object(i.j)();
                if (this.movementTarget.target && this.targetPriority[this.movementTarget.target])
                    for (const e of this.targetPriority[this.movementTarget.target].equip || []) {
                        let r = !1;
                        for (const t in parent.character.slots) {
                            const n = parent.character.slots[t];
                            if (n && n.name == e) {
                                r = !0;
                                break
                            }
                        }
                        if (!r)
                            for (const r of t)
                                if (r.name == e) {
                                    G.classes[parent.character.ctype].doublehand[G.items[e].wtype] && unequip("offhand"), equip(r.index);
                                    break
                                }
                    }
                for (const e in parent.character.slots) {
                    let r, n = parent.character.slots[e];
                    if (n) {
                        for (const e of t) e.name == n.name && (!e.level || e.level <= n.level || (n = e, r = e));
                        r && equip(r.index, e)
                    }
                }
            } catch (t) {
                console.error(t)
            }
        }
        getTargets(t = 1, e = parent.character.range) {
            const r = [],
                n = parent.party_list,
                o = new Set;
            for (const t in parent.entities)
                if (n.includes(t)) {
                    const e = parent.entities[t].target;
                    e && o.add(e)
                } const s = new a.a((t, e) => t.priority > e.priority);
            for (const t in parent.entities) {
                const r = parent.entities[t];
                if (r.rip) continue;
                if (parent.party_list.includes(t)) continue;
                if (!is_pvp() && "monster" != r.type) continue;
                if (is_pvp() && parent.party_list.includes(t)) continue;
                if (!this.targetPriority[r.mtype] && r.target != parent.character.name) continue;
                let n = this.targetPriority[r.mtype] ? this.targetPriority[r.mtype].priority : 0;
                const a = distance(parent.character, r);
                if (a > e) continue;
                n -= a, o.has(t) && (this.targetPriority[r.mtype] && this.targetPriority[r.mtype].coop && (n += parent.character.range), r.hp <= Object(i.b)(parent.character, r)[0] && (n -= parent.character.range)), r.mtype == this.mainTarget && (n += 250), this.movementTarget && r.mtype == this.movementTarget.target && (n += 1e3), r.target == parent.character.name && (n += 2e3), r.cooperative && (n += 1e3 * (r.max_hp - r.hp) / r.max_hp);
                const c = {
                    id: r.id,
                    priority: n
                };
                s.add(c)
            }
            for (; r.length < t && s.size > 0;) {
                const t = parent.entities[s.poll().id];
                t && r.push(t)
            }
            return r.length > 0 && change_target(r[0], !0), r
        }
        wantToAttack(t, e = "attack") {
            if (!Object(i.n)(e)) return !1;
            if (parent.character.c.town) return !1;
            let r = G.skills[e].range ? G.skills[e].range : parent.character.range;
            const n = distance(parent.character, t);
            if (G.skills[e].range_multiplier && (r *= G.skills[e].range_multiplier), n > r) return !1;
            const a = G.skills[e].mp ? G.skills[e].mp : parent.character.mp_cost;
            if (parent.character.mp < a) return !1;
            if ("attack" != e && t.immune) return !1;
            if ("attack" != e && t["1hp"]) return !1;
            if (!is_pvp() && "monster" == t.type && !this.targetPriority[t.mtype]) return !1;
            if (!t.target) {
                if (this.holdAttack) return !1;
                if ((smart.moving || this.astar.isMoving()) && this.movementTarget && this.movementTarget.target && this.movementTarget.target != t.mtype && this.targetPriority[t.mtype].holdAttackWhileMoving) return !1;
                if (this.targetPriority[t.mtype].holdAttackInEntityRange && n <= t.range) return !1;
                if (this.targetPriority[t.mtype].coop) {
                    const e = [parent.character.ctype];
                    for (const t of parent.party_list) {
                        const r = parent.entities[t];
                        r && (r.rip || "priest" == r.ctype && distance(parent.character, r) > r.range || e.push(r.ctype))
                    }
                    for (const r of this.targetPriority[t.mtype].coop)
                        if (!e.includes(r)) return !1
                }
                if (5 * Object(i.b)(t, parent.character)[1] * t.frequency > parent.character.hp && n <= t.range) return !1
            }
            return !0
        }
    }
}, function (t, e) {
    t.exports = function (t) {
        return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function () {
                return t.l
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function () {
                return t.i
            }
        }), t.webpackPolyfill = 1), t
    }
}, , , function (t, e, r) {
    "use strict";
    r.r(e), r.d(e, "ranger", (function () {
        return c
    }));
    var n = r(3),
        a = r(1),
        i = r(0),
        o = function (t, e, r, n) {
            return new(r || (r = Promise))((function (a, i) {
                function o(t) {
                    try {
                        c(n.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        c(n.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function c(t) {
                    var e;
                    t.done ? a(t.value) : (e = t.value, e instanceof r ? e : new r((function (t) {
                        t(e)
                    }))).then(o, s)
                }
                c((n = n.apply(t, e || [])).next())
            }))
        };
    class s extends n.a {
        constructor() {
            super(), this.targetPriority = {
                arcticbee: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                armadillo: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                bat: {
                    priority: 0,
                    farmingPosition: {
                        map: "cave",
                        x: -200,
                        y: -450
                    },
                    equip: ["bowofthedead", "t2quiver"]
                },
                bbpompom: {
                    coop: ["priest"],
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    priority: 0,
                    farmingPosition: {
                        map: "winter_cave",
                        x: -50,
                        y: -100
                    },
                    equip: ["t2bow", "t2quiver"]
                },
                bee: {
                    priority: 50,
                    holdPositionFarm: !0,
                    farmingPosition: {
                        map: "main",
                        x: 550,
                        y: 1100
                    },
                    equip: ["t2bow", "t2quiver"]
                },
                bigbird: {
                    priority: 0,
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    equip: ["firebow", "t2quiver"]
                },
                boar: {
                    priority: 0,
                    holdAttackWhileMoving: !0,
                    equip: ["firebow", "t2quiver"]
                },
                booboo: {
                    coop: ["priest"],
                    priority: 0,
                    holdAttackWhileMoving: !0,
                    holdPositionFarm: !0,
                    farmingPosition: {
                        map: "spookytown",
                        x: 190,
                        y: -650
                    },
                    equip: ["hbow", "quiver"]
                },
                cgoo: {
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                crab: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                crabx: {
                    priority: 100,
                    equip: ["t2bow", "t2quiver"]
                },
                croc: {
                    priority: 100,
                    equip: ["t2bow", "t2quiver"]
                },
                fireroamer: {
                    coop: ["priest", "warrior"],
                    priority: 0,
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    farmingPosition: {
                        map: "desertland",
                        x: 150,
                        y: -650
                    },
                    equip: ["firebow", "t2quiver"]
                },
                fvampire: {
                    coop: ["warrior", "priest"],
                    priority: 0,
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    farmingPosition: {
                        map: "halloween",
                        x: -225,
                        y: -1500
                    },
                    equip: ["firebow", "t2quiver"]
                },
                ghost: {
                    coop: ["priest"],
                    priority: 0,
                    holdAttackWhileMoving: !0,
                    holdPositionFarm: !0,
                    farmingPosition: {
                        map: "halloween",
                        x: 400,
                        y: -1200
                    },
                    equip: ["firebow", "t2quiver"]
                },
                goldenbat: {
                    priority: 1e3,
                    equip: ["t2bow", "t2quiver"]
                },
                goo: {
                    priority: -50,
                    equip: ["t2bow", "t2quiver"]
                },
                greenjr: {
                    priority: 1e3,
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    equip: ["firebow", "t2quiver"]
                },
                hen: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                iceroamer: {
                    holdAttackWhileMoving: !0,
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                jr: {
                    priority: 1e3,
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    equip: ["firebow", "t2quiver"]
                },
                mechagnome: {
                    coop: ["priest", "ranger"],
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    priority: 0,
                    farmingPosition: {
                        map: "cyberland",
                        x: 150,
                        y: -150
                    },
                    equip: ["firebow", "t2quiver"]
                },
                minimush: {
                    priority: 100,
                    equip: ["t2bow", "t2quiver"]
                },
                mole: {
                    coop: ["priest", "warrior"],
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    priority: 0,
                    farmingPosition: {
                        map: "tunnel",
                        x: -50,
                        y: -75
                    },
                    equip: ["firebow", "t2quiver"]
                },
                mummy: {
                    coop: ["priest", "warrior"],
                    priority: 0,
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    farmingPosition: {
                        map: "spookytown",
                        x: 175,
                        y: -1060
                    },
                    equip: ["firebow", "t2quiver"]
                },
                mrgreen: {
                    priority: 1e3,
                    equip: ["firebow", "t2quiver"]
                },
                mrpumpkin: {
                    priority: 1e3,
                    equip: ["firebow", "t2quiver"]
                },
                mvampire: {
                    priority: 0,
                    coop: ["priest"],
                    equip: ["firebow", "t2quiver"]
                },
                oneeye: {
                    coop: ["priest", "warrior"],
                    priority: 0,
                    holdAttackWhileMoving: !0,
                    holdPositionFarm: !0,
                    farmingPosition: {
                        map: "level2w",
                        x: -100,
                        y: 0
                    },
                    equip: ["firebow", "t2quiver"]
                },
                osnake: {
                    priority: 500,
                    equip: ["t2bow", "t2quiver"]
                },
                phoenix: {
                    priority: 1e3,
                    equip: ["firebow", "t2quiver"]
                },
                pinkgoblin: {
                    priority: 100,
                    holdAttackWhileMoving: !0,
                    coop: ["warrior", "priest"],
                    equip: ["firebow", "t2quiver"]
                },
                pinkgoo: {
                    priority: 1e3,
                    equip: ["bow", "t2quiver"]
                },
                poisio: {
                    priority: 250,
                    equip: ["t2bow", "t2quiver"]
                },
                porcupine: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                prat: {
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    holdPositionFarm: !0,
                    priority: 0,
                    farmingPosition: {
                        map: "level1",
                        x: -296.5,
                        y: 557.5
                    },
                    equip: ["hbow", "quiver"]
                },
                rat: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                rooster: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                scorpion: {
                    priority: 250,
                    equip: ["bowofthedead", "t2quiver"]
                },
                snake: {
                    priority: 0,
                    farmingPosition: {
                        map: "main",
                        x: -74,
                        y: 1904
                    },
                    equip: ["t2bow", "t2quiver"]
                },
                snowman: {
                    priority: 1e3,
                    equip: ["t2bow", "t2quiver"]
                },
                spider: {
                    priority: 100,
                    equip: ["bowofthedead", "t2quiver"]
                },
                squig: {
                    priority: 100,
                    equip: ["hbow", "quiver"]
                },
                squigtoad: {
                    priority: 250,
                    equip: ["hbow", "quiver"]
                },
                stoneworm: {
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    priority: 0,
                    equip: ["bowofthedead", "t2quiver"]
                },
                tortoise: {
                    priority: 0,
                    equip: ["t2bow", "t2quiver"]
                },
                wolf: {
                    coop: ["priest", "warrior"],
                    priority: 0,
                    holdPositionFarm: !0,
                    holdAttackWhileMoving: !0,
                    farmingPosition: {
                        map: "winterland",
                        x: 375,
                        y: -2475
                    },
                    equip: ["firebow", "t2quiver"]
                },
                wolfie: {
                    priority: 0,
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    equip: ["firebow", "t2quiver"]
                },
                xscorpion: {
                    priority: 0,
                    holdAttackInEntityRange: !0,
                    holdAttackWhileMoving: !0,
                    holdPositionFarm: !0,
                    farmingPosition: {
                        map: "halloween",
                        x: -230,
                        y: 570
                    },
                    equip: ["firebow", "t2quiver"]
                }
            }, this.mainTarget = "scorpion", this.itemsToKeep.push("bow", "bowofthedead", "crossbow", "cupid", "firebow", "hbow", "merry", "t2bow", "t3bow", "quiver", "t2quiver")
        }
        run() {
            super.run(), this.superShotLoop(), this.huntersmarkLoop(), this.fourFingersLoop()
        }
        mainLoop() {
            const t = Object.create(null, {
                mainLoop: {
                    get: () => super.mainLoop
                }
            });
            return o(this, void 0, void 0, (function* () {
                try {
                    Object(a.j)("earthMer", this.itemsToKeep), Object(a.i)("earthMer", 1e5), Object(a.h)(this.itemsToSell), this.createParty(["earthMer", "earthMag", "earthMag2", "earthWar", "earthWar2", "earthPri", "earthPri2"]), t.mainLoop.call(this)
                } catch (t) {
                    console.error(t), setTimeout(() => {
                        this.mainLoop()
                    }, 250)
                }
            }))
        }
        huntersmarkLoop() {
            try {
                const t = this.getTargets(1);
                t.length && !t[0].s.marked && t[0].hp > 5 * Object(i.b)(parent.character, t[0])[0] && this.wantToAttack(t[0], "huntersmark") && (use_skill("huntersmark", t[0]), reduce_cooldown("huntersmark", Math.min(...parent.pings)))
            } catch (t) {
                console.error(t)
            }
            setTimeout(() => {
                this.huntersmarkLoop()
            }, Object(i.f)("huntersmark"))
        }
        trackLoop() {
            return o(this, void 0, void 0, (function* () {
                try {
                    Object(i.n)("track") && is_pvp() && (use_skill("track"), reduce_cooldown("track", Math.min(...parent.pings)))
                } catch (t) {
                    console.error(t)
                }
                setTimeout(() => {
                    this.trackLoop()
                }, Object(i.f)("track"))
            }))
        }
        fourFingersLoop() {
            return o(this, void 0, void 0, (function* () {
                try {
                    const t = Object(i.i)({
                        isPlayer: !0,
                        isAttackingParty: !0,
                        isWithinDistance: G.skills["4fingers"].range
                    });
                    Object(i.n)("4fingers") && t.length > 0 && !parent.character.stoned && distance(parent.character, t[0]) <= 120 && Object(i.p)(t[0]) && t[0].target == parent.character.name && parent.character.hp < 10 * t[0].attack && (use_skill("4fingers", t[0]), reduce_cooldown("4fingers", Math.min(...parent.pings)))
                } catch (t) {
                    console.error(t)
                }
                setTimeout(() => {
                    this.fourFingersLoop()
                }, Object(i.f)("4fingers"))
            }))
        }
        superShotLoop() {
            return o(this, void 0, void 0, (function* () {
                try {
                    for (const t of this.getTargets(10, parent.character.range * G.skills.supershot.range_multiplier))
                        if (this.wantToAttack(t, "supershot")) {
                            yield use_skill("supershot", t), reduce_cooldown("supershot", Math.min(...parent.pings));
                            break
                        }
                } catch (t) {
                    console.error(t)
                }
                setTimeout(() => {
                    this.superShotLoop()
                }, Object(i.f)("supershot"))
            }))
        }
        attackLoop() {
            const t = Object.create(null, {
                attackLoop: {
                    get: () => super.attackLoop
                }
            });
            return o(this, void 0, void 0, (function* () {
                try {
                    const t = this.getTargets(6),
                        e = t.shift();
                    if (t.length >= 4 && this.wantToAttack(e, "5shot")) {
                        const r = [e];
                        for (const e of t)
                            if ((e.target || !(e.hp > .5 * Object(i.b)(parent.character, e)[0])) && (r.push(e), 5 == r.length)) break;
                        if (5 == r.length) return yield use_skill("5shot", r), reduce_cooldown("attack", Math.min(...parent.pings)), void setTimeout(() => {
                            this.attackLoop()
                        }, Object(i.f)("attack"))
                    }
                    if (t.length >= 2 && this.wantToAttack(e, "3shot")) {
                        const r = [e];
                        for (const e of t)
                            if ((e.target || !(e.hp > .7 * Object(i.b)(parent.character, e)[0])) && (r.push(e), 3 == r.length)) break;
                        if (3 == r.length) return yield use_skill("3shot", r), reduce_cooldown("attack", Math.min(...parent.pings)), void setTimeout(() => {
                            this.attackLoop()
                        }, Object(i.f)("attack"))
                    }
                    const r = Object.assign({}, parent.character);
                    if (r.apiercing += G.skills.piercingshot.apiercing, r.attack *= G.skills.piercingshot.damage_multiplier, e && this.wantToAttack(e, "piercingshot") && Object(i.b)(r, e)[0] > Object(i.b)(parent.character, e)[0]) return yield use_skill("piercingshot", e), reduce_cooldown("attack", Math.min(...parent.pings)), void setTimeout(() => {
                        this.attackLoop()
                    }, Object(i.f)("attack"))
                } catch (t) {
                    return ["cooldown", "not_found", "disabled"].includes(t.reason) || console.error(t), void setTimeout(() => {
                        this.attackLoop()
                    }, Object(i.f)("attack"))
                }
                t.attackLoop.call(this)
            }))
        }
        createParty(t) {
            if (!(parent.party_list.length >= 4))
                for (const e of t) parent.party[e] || send_party_invite(e)
        }
    }
    const c = new s
}]);