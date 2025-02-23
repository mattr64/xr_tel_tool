// script.js
// Loads telemetry paths and generates IOS-XR configuration

document.getElementById('addInterface').addEventListener('click', function() {
    const interfaceList = document.getElementById('interfaceList');
    const newInterface = document.createElement('div');
    newInterface.innerHTML = 'Interface Name: <input type="text" name="interfaces">';
    interfaceList.appendChild(newInterface);
});

document.getElementById('generateConfig').addEventListener('click', function() {
    const form = document.getElementById('telemetryForm');
    const formData = new FormData(form);
    let config = 'telemetry model-driven\n';

    function addTelemetry(groupName, paths, frequency, eventDriven = false) {
        if (paths.length > 0) {
            config += `  sensor-group SG_${groupName}\n`;
            paths.forEach(path => config += `    sensor-path ${path}\n`);

            if (eventDriven) {
                config += `  subscription SUB_${groupName}\n    sensor-group-id SG_${groupName} event-driven\n`;
            } else {
                config += `  subscription SUB_${groupName}\n    sensor-group-id SG_${groupName} sample-interval ${frequency}\n`;
            }
        }
    }

    // Basic Telemetry
    let basicPaths = formData.getAll('basicTelemetry').map(sensor => TELEMETRY_PATHS.basic[sensor]);
    addTelemetry('BASIC', basicPaths, formData.get('basicFrequency') * 1000);

    // Advanced Telemetry
    let advancedPaths = formData.getAll('advancedTelemetry').map(sensor => 
        TELEMETRY_PATHS.advanced[sensor] || (TELEMETRY_PATHS.advanced.Routing[sensor]?.path || null)
    ).filter(Boolean);
    addTelemetry('ADVANCED', advancedPaths, formData.get('advancedFrequency') * 1000);

    // Routing Telemetry
    formData.getAll('routingTelemetry').forEach(protocol => {
        let path = TELEMETRY_PATHS.advanced.Routing[protocol].path;
        let isEventDriven = formData.get(`eventDriven_${protocol}`) !== null;
        addTelemetry(`ROUTING_${protocol}`, [path], formData.get('advancedFrequency') * 1000, isEventDriven);
    });

    // Interface Telemetry
    let interfaces = formData.getAll('interfaces').filter(name => name.trim() !== '');
    if (interfaces.length > 0) {
        let interfacePaths = [];
        interfaces.forEach(iface => {
            interfacePaths.push(TELEMETRY_PATHS.interface.GenericCounters.replace('{iface}', iface));
            interfacePaths.push(TELEMETRY_PATHS.interface.DataRate.replace('{iface}', iface));
        });
        addTelemetry('INTERFACES', interfacePaths, formData.get('interfaceFrequency') * 1000);
    }

    document.getElementById('configOutput').textContent = config;
});

// ✅ FIX: Enable Event-Driven Checkboxes Dynamically
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.routing-checkbox').forEach(routingCheckbox => {
        routingCheckbox.addEventListener('change', function() {
            const eventDrivenCheckbox = this.closest('label').nextElementSibling.querySelector('.event-driven-checkbox');
            if (eventDrivenCheckbox) {
                eventDrivenCheckbox.disabled = !this.checked;
            }
        });
    });
});
