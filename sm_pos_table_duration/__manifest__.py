# -*- coding: utf-8 -*-
{
    "name": "POS Restaurant Table Seated Time",
    "version": "18.0.1.0.0",
    "category": "Point of Sale",
    "summary": "Show how long each table has been seated directly on the restaurant floor plan",
    "description": """
POS Restaurant Table Seated Time
============================

Show the elapsed seated time on every occupied table of the POS
restaurant floor plan.

* Live timer (HH:MM:SS) on each occupied table, updated every second
* Time counted from the first open order on the table
* Helps staff spot tables waiting too long at a glance
* Pure frontend, zero configuration: install and it works
    """,
    "author": "Steven Marp",
    "website": "https://apps.odoo.com/apps/modules/browse?author=Steven Marp",
    "license": "OPL-1",
    "images": ["static/description/banner.gif"],
    "depends": ["pos_restaurant"],
    "assets": {
        "point_of_sale._assets_pos": [
            "sm_pos_table_duration/static/src/*",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
    "price": 59.66,
    "currency": "USD",
}
