# Short Long Short
8 kyu
[link to kata](https://www.codewars.com/kata/50654ddff44f800200000007/train/javascript)
<br/>
[my solution]('./kata.js')
<br/>
<br/>
<p>Given 2 strings, <code>a</code> and <code>b</code>, return a string of the form short+long+short, with the shorter string on the outside
and the longer string on the inside. The strings will not be the same length, but they may be empty ( <code>zero</code> length ).</p>
<p>Hint for R users:</p>
<blockquote>The length of string is not always the same as the number of characters</blockquote>

<p>For example: <strong>(Input1, Input2) --&gt; output</strong></p>
<pre><code>("1", "22") --&gt; "1221"
("22", "1") --&gt; "1221"
</code></pre>
<pre><code class="language-java"><span class="cm-variable">ShortLongShort</span>.<span class="cm-variable">solution</span>(<span class="cm-string">"1"</span>, <span class="cm-string">"22"</span>); <span class="cm-comment">// returns "1221"</span>
<span class="cm-variable">ShortLongShort</span>.<span class="cm-variable">solution</span>(<span class="cm-string">"22"</span>, <span class="cm-string">"1"</span>); <span class="cm-comment">// returns "1221"</span>
</code></pre>
