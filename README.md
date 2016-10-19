# email-validation-script

goes through a text file of email addresses, and shows which ones are valid / invalid

## install

```bash
git clone https://github.com/good-call-nyc/email-validation-script.git
cd email-validation-script
npm link
```

## usage

```bash
email-validation-script <input-file.txt>
```

where `input-file.txt` is a list of `\n`-delimited email addresses,

places all valid and invalid email addresses in `valid-emails.txt` and `invalid-emails.txt` respectively
