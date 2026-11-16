#!/usr/bin/env node
import { runCli } from './init.js';

process.exitCode = runCli(process.argv.slice(2));
