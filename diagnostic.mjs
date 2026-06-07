#!/usr/bin/env node
/**
 * Comprehensive Error Diagnostic Report
 */

import fs from 'fs';
import path from 'path';

const projectRoot = '.';
const testDir = path.join(projectRoot, 'tests');
const pagesDir = path.join(projectRoot, 'pages');

console.log('═'.repeat(80));
console.log('📋 PLAYWRIGHT PROJECT DIAGNOSTIC REPORT');
console.log('═'.repeat(80));

// Check package.json
console.log('\n1️⃣  CHECKING PACKAGE.JSON');
const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log(`   Module Type: ${pkgJson.type}`);
console.log(`   Playwright Version: ${pkgJson.devDependencies['@playwright/test']}`);

// List all test files
console.log('\n2️⃣  TEST FILES');
const testFiles = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.js'));
testFiles.forEach(file => {
  const filePath = path.join(testDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log(`   ✓ ${file} (${lines.length} lines)`);
  
  // Check for import statements
  const imports = lines.filter(l => l.trim().startsWith('import'));
  console.log(`     - Imports: ${imports.length}`);
  imports.forEach(imp => console.log(`       ${imp.trim()}`));
});

// List all page files
console.log('\n3️⃣  PAGE OBJECT FILES');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.js'));
pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log(`   ✓ ${file} (${lines.length} lines)`);
  
  // Check for imports and exports
  const imports = lines.filter(l => l.trim().startsWith('import'));
  const exports = lines.filter(l => l.trim().startsWith('export'));
  console.log(`     - Imports: ${imports.length}, Exports: ${exports.length}`);
});

// Check for common issues
console.log('\n4️⃣  VALIDATION CHECKS');
let issueCount = 0;

// Check all test files for proper imports
testFiles.forEach(file => {
  const filePath = path.join(testDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('import { test, expect }')) {
    console.log(`   ❌ ${file}: Missing 'import { test, expect }' from @playwright/test`);
    issueCount++;
  }
  
  if (!content.includes("import ") && content.includes('.js')) {
    console.log(`   ⚠️  ${file}: Mixes require and import statements`);
    issueCount++;
  }
});

// Check all page files for proper exports
pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('export default')) {
    console.log(`   ❌ ${file}: Missing 'export default' statement`);
    issueCount++;
  }
  
  if (content.includes('module.exports')) {
    console.log(`   ⚠️  ${file}: Uses CommonJS 'module.exports' instead of ES6 'export'`);
    issueCount++;
  }
});

console.log('\n5️⃣  SUMMARY');
if (issueCount === 0) {
  console.log('   ✨ No issues detected! All files are properly structured.');
} else {
  console.log(`   ❌ Found ${issueCount} potential issue(s)`);
}

console.log('\n' + '═'.repeat(80));
