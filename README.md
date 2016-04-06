# casper-spysru-scraper

This is a very (VERY) simple scraper written for CasperJS that will grab the current 30/50/100/200 public proxies for 
that country. There is very little error detection in this (if any) so please feel free to fork and issue pull requests.

### Requirements
  - [casperjs] - Navigation scripting & testing utility for PhantomJS and SlimerJS http://casperjs.org/

### Parameters
  - Country Code (ex: us). Send one at a time
  - Limit of proxies (30, 50, 100, 200 are only choices)

### Example Usage
```sh
$ cd casper-spysru-scraper/js
$ casperjs scrape.spys.ru.js cn 200
```