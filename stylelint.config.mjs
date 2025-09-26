/** @type {import("stylelint").Config} */
export default {
    extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
    rules: {
        'at-rule-no-unknown': null,
        'at-rule-no-deprecated': null
    }
}
