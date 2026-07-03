/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FloorScreen } from "@pos_restaurant/app/screens/floor_screen/floor_screen";
import { useState, onWillDestroy } from "@odoo/owl";

patch(FloorScreen.prototype, {
    setup() {
        super.setup(...arguments);
        this.smState = useState({ now: Date.now() });
        const tick = setInterval(() => (this.smState.now = Date.now()), 1000);
        onWillDestroy(() => clearInterval(tick));
    },

    smSeatedTime(table) {
        const now = this.smState.now;
        const orders = this.pos.getTableOrders(table.id);
        if (!orders.length) {
            return "";
        }
        const starts = orders
            .map((o) => (o.date_order?.ts ?? new Date(o.date_order).getTime()))
            .filter((t) => !isNaN(t));
        if (!starts.length) {
            return "";
        }
        const seconds = Math.max(0, Math.floor((now - Math.min(...starts)) / 1000));
        const pad = (n) => String(n).padStart(2, "0");
        return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
    },
});
