const express = require("express");
const fs = require("fs");
const path = require("path");

const { notes } = require("./db/db.json");

const app = express();
const PORT = 3001;
