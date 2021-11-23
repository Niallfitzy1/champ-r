import { app } from 'electron';
import axios from 'axios';

let onlineVersion = '';

export async function isUpdateAvailable() {
  console.log(`Updater » Checking for Updates ...`);

  if (onlineVersion === '') {
    const response = await axios(
      'https://raw.githubusercontent.com/GeorgeV220/champ-r/master/version.md',
    );
    onlineVersion = response.data;
  }

  var localVersion = app.getVersion();

  if (compareVersions(onlineVersion.replace('v', ''), localVersion.replace('v', '')) === 0) {
    console.log('Updater » You are running the newest build.');
    return 0;
  } else if (compareVersions(onlineVersion.replace('v', ''), localVersion.replace('v', '')) === 1) {
    console.log('A new version is available.');
    console.log('Updater » New version available!');
    console.log(
      'Updater » Version: ' + onlineVersion + '. You are running version: ' + localVersion,
    );
    console.log('Updater » Update at: https://github.com/GeorgeV220/champ-r/releases/');
    return 1;
  } else {
    console.log(
      'Updater » You are currently using the ' +
        localVersion +
        ' version which is under development. If you have problems contact me on discord or github',
    );
    console.log('Updater » Your version is ' + localVersion);
    console.log('Updater » Latest released version is ' + onlineVersion);
    return 2;
  }
}

export function getOnlineVersion() {
  return onlineVersion;
}

function compareVersions(version1: string, version2: string) {
  if (version1.includes('dev') || version2.includes('dev')) {
    return -1;
  }
  var comparisonResult = 0;
  var version1Splits = version1.split('-')[0].split('\\.');
  var version2Splits = version2.split('-')[0].split('\\.');
  var maxLengthOfVersionSplits = Math.max(version1Splits.length, version2Splits.length);
  for (var i = 0; i < maxLengthOfVersionSplits; i++) {
    var v1 = i < version1Splits.length ? parseInt(version1Splits[i]) : 0;
    var v2 = i < version2Splits.length ? parseInt(version2Splits[i]) : 0;
    var compare = v1 < v2 ? -1 : v1 === v2 ? 0 : 1;
    if (compare !== 0) {
      comparisonResult = compare;
      break;
    }
  }
  return comparisonResult;
}
