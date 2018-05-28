it("should contain no comments in out chunk", () => {
	const fs = require("fs");

	const source = fs.readFileSync(__filename, "utf-8");

	expect(source).not.toMatch(/[^\"]comment should be stripped test\.1[^\"]/);
	expect(source).not.toMatch(/[^\"]comment should be stripped test\.2[^\"]/);
	expect(source).not.toMatch(/[^\"]comment should be stripped test\.3[^\"]/);
});

it("should contain comments in vendors chunk", function() {
	const fs = require("fs");
	const path = require("path");

	const source = fs.readFileSync(path.join(__dirname, "vendors.js"), "utf-8");

	expect(source).toMatch("comment should not be stripped vendors.1");
	expect(source).toMatch("// comment should not be stripped vendors.2");
	expect(source).toMatch(" * comment should not be stripped vendors.3");
});

it("should extract comments to separate file", function() {
	const fs = require("fs");
	const path = require("path");

	const source = fs.readFileSync(path.join(__dirname, "extract.js.LICENSE"), "utf-8");

	expect(source).toMatch("comment should be extracted extract-test.1");
	expect(source).not.toMatch("comment should be stripped extract-test.2");
	expect(source).toMatch("comment should be extracted extract-test.3");
	expect(source).not.toMatch("comment should be stripped extract-test.4");
});

it("should remove extracted comments and insert a banner", function() {
	const fs = require("fs");
	const path = require("path");

	const source = fs.readFileSync(path.join(__dirname, "extract.js"), "utf-8");

	expect(source).not.toMatch("comment should be extracted extract-test.1");
	expect(source).not.toMatch("comment should be stripped extract-test.2");
	expect(source).not.toMatch("comment should be extracted extract-test.3");
	expect(source).not.toMatch("comment should be stripped extract-test.4");
	expect(source).toMatch("/*! For license information please see extract.js.LICENSE */");
});

it("should pass mangle options", function() {
	const fs = require("fs");
	const path = require("path");

	const source = fs.readFileSync(path.join(__dirname, "ie8.js"), "utf-8");

	expect(source).toMatch("t.exports=function(t){return function(n){try{t()}catch(t){n(t)}}}");
});

it("should pass compress options", function() {
	const fs = require("fs");
	const path = require("path");

	const source = fs.readFileSync(path.join(__dirname, "compress.js"), "utf-8");

	expect(source).toMatch("o.exports=function(){console.log(4),console.log(6),console.log(4),console.log(7)}");
});

require.include("./test.js");
