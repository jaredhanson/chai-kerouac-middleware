function Site() {
  this.settings = {};
}

Site.prototype.get =
Site.prototype.set = function(setting, val) {
  // translate for Express compatibility
  if (setting === 'view engine') { setting = 'layout engine' }
  
  if (1 == arguments.length) {
    return this.settings[setting];
  } else {
    this.settings[setting] = val;
    return this;
  }
}


module.exports = Site;
