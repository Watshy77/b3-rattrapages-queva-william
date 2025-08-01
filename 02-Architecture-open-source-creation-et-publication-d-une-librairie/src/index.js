/**
 * validateEnv(schema)
 * @param {Array<{name: string, required: boolean, type: string, regex?: string}>} schema
 */
function validateEnv(schema) {
    schema.forEach(def => {
        const val = process.env[def.name];
        if (def.required && (val === undefined || val === '')) {
            throw new Error(`Missing required env var: ${def.name}`);
        }
        if (val !== undefined && val !== '') {
            switch (def.type) {
                case 'number':
                    if (isNaN(Number(val))) {
                        throw new Error(`Env var ${def.name} is not a valid number`);
                    }
                    break;
                case 'boolean':
                    if (!['true', 'false'].includes(val.toLowerCase())) {
                        throw new Error(`Env var ${def.name} is not a valid boolean`);
                    }
                    break;
                case 'string':
                    break;
                default:
                    throw new Error(`Unknown type for env var ${def.name}: ${def.type}`);
            }
            if (def.regex) {
                const re = new RegExp(def.regex);
                if (!re.test(val)) {
                    const displayPattern = def.regex.replace(/\\/g, '\\\\');
                    throw new Error(
                        `Env var ${def.name} does not match pattern ${displayPattern}`
                    );
                }
            }
        }
    });
}

module.exports = { validateEnv };
