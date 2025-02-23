// telemetry-config.js
// Stores telemetry paths for easy maintenance
const TELEMETRY_PATHS = {
    basic: {
        CPU: "Cisco-IOS-XR-wdsysmon-fd-oper:system-monitoring/cpu-utilization",
        Memory: "Cisco-IOS-XR-wdsysmon-fd-oper:system-monitoring/memory-utilization",
        Disk: "Cisco-IOS-XR-infra-disk-monitor-oper:disk-monitor/disk-utilization"
    },
    advanced: {
        OpticalPower: "Cisco-IOS-XR-controller-optics-oper:optics-oper/optics-ports/optics-port/optics-info",
        MPLS_TE: "Cisco-IOS-XR-mpls-te-oper:mpls-te/tunnels/summary",
        MPLS_LDP: "Cisco-IOS-XR-mpls-ldp-oper:mpls-ldp/nodes/node/neighbors/neighbor",
        Routing: {
            OSPF: { path: "Cisco-IOS-XR-ipv4-ospf-oper:ospf/processes/process", eventDriven: true },
            BGP: { path: "Cisco-IOS-XR-ipv4-bgp-oper:bgp/instances/instance", eventDriven: true },
            ISIS: { path: "Cisco-IOS-XR-clns-isis-oper:isis/instances/instance", eventDriven: true },
            EIGRP: { path: "Cisco-IOS-XR-ipv4-eigrp-oper:eigrp/processes/process", eventDriven: true },
            RIB: { path: "Cisco-IOS-XR-ip-rib-ipv4-oper:rib/rib-table-ids", eventDriven: true },
            LISP: { path: "Cisco-IOS-XR-lisp-oper:lisp/instances/instance", eventDriven: true }
        }
    },
    interface: {
        GenericCounters: "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface[name='{iface}']/generic-counters",
        DataRate: "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface[name='{iface}']/data-rate"
    }
};