odoo.define('sm_pos_table_duration.TableWidget', function(require) {
    'use strict';

    const TableWidget = require('pos_restaurant.TableWidget');
    const Registries = require('point_of_sale.Registries');
    const { useState } = owl.hooks;

    const SmTableWidget = (TableWidget) =>
        class extends TableWidget {
            constructor() {
                super(...arguments);
                this.smState = useState({ now: Date.now() });
            }

            mounted() {
                if (super.mounted) {
                    super.mounted(...arguments);
                }
                this.tick = setInterval(() => {
                    this.smState.now = Date.now();
                }, 1000);
            }

            willUnmount() {
                clearInterval(this.tick);
                if (super.willUnmount) {
                    super.willUnmount(...arguments);
                }
            }

            smSeatedTime() {
                const now = this.smState.now;
                const orders = this.env.pos.get_table_orders(this.props.table).filter(o => !o.finalized);
                if (!orders || !orders.length) {
                    return "";
                }
                const starts = orders
                    .map((o) => {
                        const d = o.validation_date || o.creation_date;
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

            isOccupied() {
                return this.orderCount > 0 || this.env.pos.get_customer_count(this.props.table) > 0;
            }
        };

    Registries.Component.extend(TableWidget, SmTableWidget);

    return TableWidget;
});
