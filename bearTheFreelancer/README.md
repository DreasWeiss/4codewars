# Bear the Freelancer
7 kyu
[link to kata](https://www.codewars.com/kata/58d5b39b1c0402c5f7002e0d/train/javascript)
<br/>
[my solution]('./kata.js')
<br/>
<br/>
<h1 id="story">Story</h1>
<p>Bear the Freelancer charges clients on the hour, but he adjusts his rate depending on how close friends he is with his clients. For close friends, he charges $25 per hour, for his other friends he charges $50, for his acquaintances his hourly rate is $100, reaching $125 for all his other clients.</p>
<h1 id="input">Input</h1>
<p>You’ll receive a list of lists, representing all the jobs Bear the Freelancer carried out for the month. Each array within the outer list is comprised of the number of hours worked, and the proximity to the client as a string, the possible values being 'Close Friend', 'Friend', 'Acquaintance', or any other string for the rest of his clients. The recognition of those three strings ('Close Friend', 'Friend', and 'Acquaintance') should be case insensitive.</p>
<p><strong>Example</strong></p>
<pre><code class="language-javascript">[[<span class="cm-number">10</span>, <span class="cm-string">'Close Friend'</span>], [<span class="cm-number">3</span>, <span class="cm-string">'Acquaintance'</span>], [<span class="cm-number">7</span>, <span class="cm-string">'Lead from web'</span>], [<span class="cm-number">6</span>, <span class="cm-string">'Friend'</span>], [<span class="cm-number">2</span>, <span class="cm-string">'From advertisements'</span>]]
</code></pre>
<p>In this example, he'll be charging 10 hours at $25, 3 hours at $100, 7 hours at $125, 6 hours at $50, and 2 hours at $125, for a total of $1975.</p>
<h1 id="expected-output">Expected Output</h1>
<p>The total amount of dollars Bear the Freelancer has invoiced for his work. For an empty array, return 0.</p>
<p><strong>Example</strong></p>
<pre><code class="language-javascript"><span class="cm-number">1975</span>
</code></pre>
