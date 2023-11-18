const fs = require('fs');
const axios = require('axios');
const process = require('process');

/**
 * Fetches content from a URL and writes it to a file named after the URL's hostname.
 * @param {string} url - The URL to fetch content from.
 */
async function fetchAndWriteURL(url) {
  try {
    const response = await axios.get(url);
    const hostname = new URL(url).hostname;
    fs.writeFileSync(hostname, response.data, 'utf8');
    console.log(`Wrote to ${hostname}`);
  } catch (err) {
    console.error(`Couldn't download ${url}: ${err.message}`);
  }
}

/**
 * Reads a file containing URLs and processes each URL.
 * @param {string} filename - The name of the file to read URLs from.
 */
function processURLsFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}: ${err.message}`);
      process.exit(1);
    } else {
      const urls = data.split(/\r?\n/);
      urls.forEach(url => {
        if (url) fetchAndWriteURL(url);
      });
    }
  });
}

// Getting the filename from the command line arguments
const filename = process.argv[2];
if (!filename) {
  console.error('Please provide a filename as an argument.');
  process.exit(1);
}

processURLsFile(filename);