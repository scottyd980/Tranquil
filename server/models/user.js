module.exports = function (orm, db) {
  var bcrypt = require('bcrypt');
  return db.define('user', {
    username: String,
    email: String,
    password: String,
    created_on: Date,
    last_login: Date,
    active: Boolean,
    first_name: String,
    last_name: String,
    remember_token: String,
    salt: String
  }, {
    validations: {
      username: [ orm.validators.required('required'), orm.validators.unique('already in use') ],
      email: [ orm.validators.required('required'), orm.validators.patterns.email('invalid email'), orm.validators.unique('already in use') ],
      password: orm.validators.password('invalid password'),
      created_on: orm.validators.required('required'),
      active: orm.validators.required('required'),
      first_name: orm.validators.required('required')
    },
    methods: {
        fullName: function () {
            return this.first_name + ' ' + this.last_name;
        },

        comparePassword: function( testPassword, callback ) {
          bcrypt.compare( testPassword, this.password, function(err, isMatch) {
            if( err ) { return callback(err); }
            callback( null, isMatch );
          });
        }
    },
    hooks: {
      beforeCreate: function (next) {
        if (!this.salt) {
          this.salt = bcrypt.genSaltSync(10);
        }
        if (this.password) {
          this.password = bcrypt.hashSync(this.password, this.salt);
        }
        next();
      }
    }
  });
};
