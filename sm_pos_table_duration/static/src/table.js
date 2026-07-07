/** @odoo-module **/

import { Table } from "@pos_restaurant/app/floor_screen/table";
import { patch } from "@web/core/utils/patch";
import { useState, onWillDestroy } from "@odoo/owl";

patch(Table.prototype, {
    setup() {
        super.setup(...arguments);
        this.smState = useState({ now: Date.now() });
        const tick = setInterval(() => {
            this.smState.now = Date.now();
        }, 1000);
        onWillDestroy(() => {
            clearInterval(tick);
        });
    },

    smSeatedTime() {
        const now = this.smState.now;
        const orders = this.pos.getTableOrders(this.props.table.id);
        if (!orders || !orders.length) {
            return "";
        }
        const starts = orders
            .map((o) => {
                const d = o.date_order;
                if (!d) {
                    return NaN;
                }
                if (typeof d === "object" && typeof d.valueOf === "function") {
                    return d.valueOf();
                }
                return new Date(d).getTime();
            })
            .filter((t) => !isNaN(t));
        if (!starts.length) {
            return "";
        }
        const seconds = Math.max(0, Math.floor((now - Math.min(...starts)) / 1000));
        const pad = (n) => String(n).padStart(2, "0");
        return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
    }
});
