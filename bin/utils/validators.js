function missingOption(opts) {
  if (!opts.c && !opts.a && !opts.create && !opts.alter) {
    console.error('ERROR > missing main option');
    return true;
  }
  return false;
}

function multipleOptions(opts) {
  if ((opts.c || opts.create) && (opts.a || opts.alter)) {
    console.error('ERROR > you may only use one option');
    return true;
  }
  return false;
}

function createArgs(opts) {
  if (!opts.tableName) {
    console.error('ERROR > missing arguments for create option');
    return false;
  }
  return true;
}

function validateArgs(opts) {
  if (opts.c) {
    return createArgs(opts);
  }

  if (opts.a) {
    // pending
  }

  return false;
}

function validateOptions(opts) {
  return !missingOption(opts) && !multipleOptions(opts) && validateArgs(opts);
}

module.exports = { validateOptions }
