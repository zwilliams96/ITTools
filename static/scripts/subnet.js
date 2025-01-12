document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subnet-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const ipAddress = document.getElementById('ip-address').value;
        const subnetMask = document.getElementById('subnet-mask').value;

        if (validateIPAddress(ipAddress) && validateIPAddress(subnetMask)) {
            calculateSubnet(ipAddress, subnetMask);
        } else {
            alert('Please enter a valid IP address and subnet mask.');
        }
    });
});

function validateIPAddress(ip) {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
}

function calculateSubnet(ip, mask) {
    // Handle case of the mask bing 255.255.255.255
    if (mask == '255.255.255.255' || mask == '255.255.255.254') {
        console.log('Handling Case');
        const ipArray = ip.split('.').map(Number);
        const subnetArray = mask.split('.').map(Number);
        const wildcardMask = calculateWildcardmask(subnetArray);
        const networkAddress = calculateNetworkAddress(ipArray, subnetArray);
        const broadcastAddress = calculateBroadcastAddress(networkAddress, subnetArray);
        displayResults(ip, mask, networkAddress, broadcastAddress, -1, [], [], wildcardMask);
    } else {
        const ipArray = ip.split('.').map(Number);
        const subnetArray = mask.split('.').map(Number);
        const wildcardMask = calculateWildcardmask(subnetArray);
        const networkAddress = calculateNetworkAddress(ipArray, subnetArray);
        const broadcastAddress = calculateBroadcastAddress(networkAddress, subnetArray);
        const numberOfUsableHosts = calculateNumberOfUsableHosts(subnetArray);
        const [firstUsableHost, lastUsableHost] = calculateUsableHostRange(networkAddress, broadcastAddress);

        displayResults(ip, mask, networkAddress, broadcastAddress, numberOfUsableHosts, firstUsableHost, lastUsableHost, wildcardMask);
    }
}

function calculateWildcardmask(subnetArray) {
    return subnetArray.map(num => 255 - num);
}

function calculateNetworkAddress(ipArray, subnetArray) {
    return ipArray.map((num, index) => num & subnetArray[index]);
}

function calculateBroadcastAddress(networkAddress, subnetArray) {
    const inverseSubnetArray = subnetArray.map(num => ~num & 255);
    return networkAddress.map((num, index) => num | inverseSubnetArray[index]);
}

function calculateNumberOfUsableHosts(subnetArray) {
    const subnetBinary = subnetArray.map(num => num.toString(2).padStart(8, '0')).join('');
    const numberOfHostBits = subnetBinary.split('0').length - 1;
    return Math.pow(2, numberOfHostBits) - 2;
}

function calculateUsableHostRange(networkAddress, broadcastAddress) {
    const firstUsableHost = [...networkAddress];
    firstUsableHost[3] += 1;

    const lastUsableHost = [...broadcastAddress];
    lastUsableHost[3] -= 1;

    return [firstUsableHost, lastUsableHost];
}

function displayResults(ip, mask, networkAddress, broadcastAddress, numberOfUsableHosts, firstUsableHost, lastUsableHost, wildcardMask) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">Results</h5>
                <p class="card-text"><strong>IP Address:</strong> ${ip}</p>
                <p class="card-text"><strong>Network Address:</strong> ${networkAddress.join('.')}</p>
                <p class="card-text"><strong>Usable Host Range:</strong> ${firstUsableHost.join('.')} - ${lastUsableHost.join('.')}</p>
                <p class="card-text"><strong>Broadcast Address:</strong> ${broadcastAddress.join('.')}</p>
                <p class="card-text"><strong>Total Number of Hosts:</strong> ${numberOfUsableHosts.toLocaleString() + 2}</p>
                <p class="card-text"><strong>Number of Usable Hosts:</strong> ${(numberOfUsableHosts < 0) ? 0 : numberOfUsableHosts.toLocaleString()}</p>
                <p class="card-text"><strong>Subnet Mask:</strong> ${mask}</p>
                <p class="card-text"><strong>Wildcard Mask:</strong> ${wildcardMask.join('.')}</p>
            </div>
        </div>
    `;
}