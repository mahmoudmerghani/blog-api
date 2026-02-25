import queries from "./queries.js";

const blogs = [
    {
        title: "Getting Started with Node.js",
        content: `<h1>Getting Started with Node.js</h1>
<p>Node.js is a powerful JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript on the server side.</p>
<h2>Why Node.js?</h2>
<ul>
    <li>Non-blocking, event-driven architecture</li>
    <li>Large ecosystem via <strong>npm</strong></li>
    <li>Same language on front-end and back-end</li>
</ul>
<h2>Your First Server</h2>
<pre><code>const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Hello, World!');
});
server.listen(3000);</code></pre>
<p>Save this file and run it with <code>node server.js</code>. Visit <a href="http://localhost:3000" target="_blank" rel="noopener">localhost:3000</a> to see your server in action.</p>`,
    },
    {
        title: "Understanding CSS Flexbox",
        content: `<h1>Understanding CSS Flexbox</h1>
<p>Flexbox is a one-dimensional layout model that makes it easy to align and distribute space among items in a container.</p>
<h2>Key Concepts</h2>
<ol>
    <li><strong>Flex Container</strong> — the parent element with <code>display: flex</code></li>
    <li><strong>Flex Items</strong> — the direct children of the container</li>
    <li><strong>Main Axis</strong> — the primary axis (horizontal by default)</li>
    <li><strong>Cross Axis</strong> — the perpendicular axis</li>
</ol>
<h2>Common Properties</h2>
<p>Use <code>justify-content</code> to align items along the main axis, and <code>align-items</code> for the cross axis.</p>
<blockquote><em>Flexbox changed the way we think about layout in CSS.</em></blockquote>`,
    },
    {
        title: "An Introduction to REST APIs",
        content: `<h1>An Introduction to REST APIs</h1>
<p>A <strong>REST API</strong> (Representational State Transfer) is an architectural style for building web services. It relies on stateless, client-server communication over HTTP.</p>
<h2>The Six Constraints</h2>
<ul>
    <li>Uniform Interface</li>
    <li>Stateless</li>
    <li>Cacheable</li>
    <li>Client-Server</li>
    <li>Layered System</li>
    <li>Code on Demand <em>(optional)</em></li>
</ul>
<h2>HTTP Methods</h2>
<p>REST APIs use standard HTTP verbs:</p>
<ul>
    <li><strong>GET</strong> — retrieve a resource</li>
    <li><strong>POST</strong> — create a resource</li>
    <li><strong>PUT / PATCH</strong> — update a resource</li>
    <li><strong>DELETE</strong> — remove a resource</li>
</ul>
<p>Learn more in the <a href="https://restfulapi.net" target="_blank" rel="noopener">REST API documentation</a>.</p>`,
    },
    {
        title: "Why You Should Learn TypeScript",
        content: `<h1>Why You Should Learn TypeScript</h1>
<p>TypeScript is a <strong>typed superset of JavaScript</strong> that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming.</p>
<h2>Benefits</h2>
<ol>
    <li>Catch errors at compile time rather than runtime</li>
    <li>Better IDE support with autocompletion and refactoring</li>
    <li>Improved readability and maintainability</li>
</ol>
<h2>A Simple Example</h2>
<pre><code>function greet(name: string): string {
    return \`Hello, \${name}!\`;
}
console.log(greet("World"));</code></pre>
<blockquote><em>"TypeScript is JavaScript that scales."</em></blockquote>
<p>If you're already comfortable with JavaScript, picking up TypeScript is well worth the investment.</p>`,
    },
    {
        title: "Database Indexing Explained",
        content: `<h1>Database Indexing Explained</h1>
<p>An <strong>index</strong> is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional storage and write overhead.</p>
<h2>How It Works</h2>
<p>Without an index, the database performs a <em>full table scan</em> — reading every row to find matching records. With an index, it can jump directly to the relevant rows.</p>
<h2>Types of Indexes</h2>
<ul>
    <li><strong>B-Tree Index</strong> — the default in most databases; great for range queries</li>
    <li><strong>Hash Index</strong> — fast for equality lookups</li>
    <li><strong>Full-Text Index</strong> — optimised for text search</li>
    <li><strong>Composite Index</strong> — indexes multiple columns together</li>
</ul>
<h2>When to Index</h2>
<p>Index columns that are frequently used in <code>WHERE</code>, <code>JOIN</code>, or <code>ORDER BY</code> clauses. Avoid over-indexing, as each index slows down <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> operations.</p>`,
    },
];

async function main() {
    const creatorId = 1;

    for (const blog of blogs) {
        const created = await queries.createBlog({ ...blog, creatorId });
        console.log(`Created blog [${created.id}]: ${created.title}`);
    }

    console.log("Done.");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
