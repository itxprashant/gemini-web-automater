\vspace{1em}
\textbf{Complex Differentiability}

Let $f: U \to \mathbb{C}$ be given and $a \in U$. We say $f$ is (complex) differentiable at $a$ if:
$$ \lim_{h\to 0} \frac{f(a+h)-f(a)}{h} \text{ exists in } \mathbb{C}. $$
We denote the limit by $f'(a)$.
$$ \lim_{h\to 0} \frac{f(a+h)-f(a)}{h} - f'(a) = 0 \implies \lim_{h\to 0} \frac{f(a+h)-f(a)-f'(a)h}{h} = 0 $$

A function which is complex differentiable at a point $a \in U$ is also $\mathbb{R}^2$-differentiable when we see $a=(b,c)$ in $\mathbb{R}^2$.
What about the converse? We know that the function given by $z \mapsto \bar{z}$ is (real) differentiable (it is a linear transformation). However, to check for complex differentiability, Cauchy-Riemann equations must be satisfied. For $z \mapsto \bar{z}$, we have $u_x = 1, v_y = -1$, so $u_x \neq v_y$. Hence, it is NOT complex differentiable. The limit $\lim_{h\to 0} \frac{\overline{a+h}-\bar{a}}{h} = \lim_{h\to 0} \frac{\bar{h}}{h}$ does not exist. The converse need not be true. Complex diff $\implies$ real diff, but real diff $\nRightarrow$ complex diff.

If we consider the matrix representation of $f'(a)$:
$$ [f'(a)] = [c+id] = \begin{pmatrix} c & -d \\ d & c \end{pmatrix} $$
Comparing it with the matrix of a linear transformation w.r.t standard ordered basis:
$$ \begin{pmatrix} \frac{\partial f_1}{\partial x} & \frac{\partial f_1}{\partial y} \\ \frac{\partial f_2}{\partial x} & \frac{\partial f_2}{\partial y} \end{pmatrix} $$
where $f = f_1 + i f_2$. This gives us the Cauchy-Riemann equations: $\frac{\partial f_1}{\partial x} = \frac{\partial f_2}{\partial y}$ and $\frac{\partial f_2}{\partial x} = -\frac{\partial f_1}{\partial y}$.

For instance, $z^2$ is differentiable on $\mathbb{C}$. Polynomials are complex differentiable.

\textbf{Remark:} If $f$ is differentiable at $a \in U$, then $f$ is continuous at $a$.
$$ \lim_{h\to 0} (f(a+h)-f(a)) = \lim_{h\to 0} \frac{f(a+h)-f(a)}{h} \cdot h = f'(a) \cdot 0 = 0 $$

\vspace{1em}
\textbf{Algebra of Differentiable Functions}

Let $f,g: U \to \mathbb{C}$ be given, and $a \in U$. Suppose $f, g$ are differentiable at $a$, then:
1. $f \pm g$, $fg$, and $cf$ are differentiable at $a$.
$$ (f \pm g)'(a) = f'(a) \pm g'(a) $$
$$ (fg)'(a) = f'(a)g(a) + f(a)g'(a) $$
$$ (cf)'(a) = c \cdot f'(a) $$
2. If $g(a) \neq 0$, then $1/g$ and $f/g$ are differentiable at $a$.
$$ \left(\frac{f}{g}\right)'(a) = \frac{f'(a)g(a) - g'(a)f(a)}{(g(a))^2} $$

\textbf{Chain Rule:}
Let $g: U \to \mathbb{C}$ and $f: V \to \mathbb{C}$ be differentiable such that $g(U) \subseteq V$. Then $f \circ g: U \to \mathbb{C}$ is differentiable and:
$$ (f \circ g)'(z) = f'(g(z)) \cdot g'(z) $$
\textbf{Corollary:} $\left(\frac{1}{g(z)}\right)' = -\frac{1}{(g(z))^2} g'(z)$.

\textit{Proof of chain rule:}
Take $z_0 \in U$. We want to show that $\lim_{h\to 0} \frac{f(g(z_0+h))-f(g(z_0))}{h}$ exists and equals $f'(g(z_0))g'(z_0)$.
Let $h_n$ be a sequence such that $h_n \to 0$.
We can write:
$$ \frac{f(g(z_0+h_n))-f(g(z_0))}{h_n} = \frac{f(g(z_0+h_n))-f(g(z_0))}{g(z_0+h_n)-g(z_0)} \cdot \frac{g(z_0+h_n)-g(z_0)}{h_n} $$
As $h_n \to 0$, $g(z_0+h_n) - g(z_0) \to 0$. We split into two cases for the indices $n$:
Case 1: $I_2 = \{h_n \mid g(z_0+h_n) \neq g(z_0)\}$. Here, the limit approaches $f'(g(z_0))g'(z_0)$.
Case 2: $I_1 = \{h_n \mid g(z_0+h_n) = g(z_0)\}$. Here, $\lim_{n \to \infty, n \in I_1} \frac{g(z_0+h_n)-g(z_0)}{h_n} = 0 \implies g'(z_0) = 0$. The overall limit is $0 = f'(g(z_0)) \cdot 0$.
In both cases, the limit exists and equals $f'(g(z_0)) \cdot g'(z_0)$.

\vspace{1em}
\textbf{Necessary Condition for Differentiability (Cauchy-Riemann Equations)}

\textbf{Theorem:} Let $U \subseteq \mathbb{C}$ be open. Suppose $f$ is differentiable at a point $z_0 \in U$. Then the partial derivatives $f_x$ and $f_y$ at $z_0$ exist and satisfy the identity $f_y(z_0) = i f_x(z_0)$.

\textbf{Remark:} If $f$ is differentiable at $z_0$, then $f'(z_0) = f_x(z_0)$.

\textit{Proof:} Given $f$ is differentiable at $z_0$, the limit $\lim_{h\to 0} \frac{f(z_0+h)-f(z_0)}{h}$ exists. This limit is independent of the path that we choose. Let $z_0 = a+ib$.

If we choose the path $h \to 0$ along the real axis ($h \in \mathbb{R}$):
$$ f_x(z_0) = \lim_{h\to 0} \frac{f(a+h+ib)-f(a+ib)}{h} $$
We see that $f'(z_0) = f_x(z_0)$.

If we choose the path $h \to 0$ along the imaginary axis ($h \in i\mathbb{R}$), meaning $h = ik$ where $k \in \mathbb{R}$ and $k \to 0$:
$$ \lim_{k\to 0} \frac{f(a+ib+ik)-f(a+ib)}{ik} = \lim_{k\to 0} \frac{f(a+i(b+k))-f(a+ib)}{ik} = \frac{1}{i} f_y(z_0) $$
Since the limit must be the same along any path, we have:
$$ f_x(z_0) = f'(z_0) = \frac{1}{i} f_y(z_0) \implies f_y(z_0) = i f_x(z_0) $$

Suppose $f = u+iv$, where $u = \text{Re}(f)$ and $v = \text{Im}(f)$ are functions from $U \to \mathbb{R}$.
Then $f_x = u_x + i v_x$ and $f_y = u_y + i v_y$.
Also, $i f_x = i(u_x + i v_x) = -v_x + i u_x$.
By the Cauchy-Riemann equation $i f_x = f_y$, we equate real and imaginary parts:
$$ -v_x + i u_x = u_y + i v_y $$
This yields the Cauchy-Riemann equations:
$$ u_x = v_y \quad \text{and} \quad u_y = -v_x \quad \text{at } z_0. $$

\vspace{1em}
\textbf{What about the converse?}

Does $f_y(z_0) = i f_x(z_0)$ imply that $f$ is differentiable at $z_0$?
No. Consider the function $f: \mathbb{C} \to \mathbb{C}$ given by:
$$ f(z) = f(x,y) = \begin{cases} \frac{xy(x+iy)}{x^2+y^2} & z \neq 0 \\ 0 & z = 0 \end{cases} $$

At $z=0$:
$$ f_x(0) = \lim_{h\to 0} \frac{f(h)-f(0)}{h} = 0 $$
$$ f_y(0) = \lim_{h\to 0} \frac{f(ih)-f(0)}{h} = 0 $$
Hence, the Cauchy-Riemann equation is satisfied at $z=0$.

However, if we calculate the complex derivative limit at $z=0$:
$$ \lim_{h\to 0} \frac{f(h)-f(0)}{h} = \lim_{h_1, h_2 \to 0} \frac{h_1 h_2 (h_1 + i h_2)}{(h_1^2 + h_2^2)(h_1 + i h_2)} = \lim_{h_1, h_2 \to 0} \frac{h_1 h_2}{h_1^2 + h_2^2} $$
Taking the path $h_2 = m h_1$, the limit becomes $\frac{m}{1+m^2}$, which depends on $m$. Thus, the limit does NOT exist, and the function is not complex differentiable at $z=0$.

\vspace{1em}
\textbf{Result from Calculus}

Let $f: U (\subseteq \mathbb{R}^2) \to \mathbb{R}$. If $f_x$ and $f_y$ exist in a neighborhood of $(a,b) \in U$ and are continuous at $(a,b)$, then $f$ is differentiable at $(a,b)$.

\textbf{Theorem (Partial Converse of Cauchy-Riemann Equations):}
Let $f: U \to \mathbb{C}$ be given. If $f_x, f_y$ exist in $U$ and $f_y = i f_x$ at $z_0$, and $f_x, f_y$ are continuous in $U$, then $f$ is differentiable at $z_0$.

\textit{Proof:}
We need to show that:
$$ \lim_{h\to 0} \frac{f(z_0+h)-f(z_0)}{h} \text{ exists and is equal to } f_x(z_0) $$
Let $z_0 = a_0 + i b_0 = (a_0, b_0)$ and $h = a + ib = (a,b)$.
Write $f = u+iv$, where $u = \text{Re}(f)$ and $v = \text{Im}(f)$.
We want to show:
$$ \lim_{h\to 0} \frac{u(z_0+h)-u(z_0) + i(v(z_0+h)-v(z_0))}{h} = u_x(z_0) + iv_x(z_0) $$

Applying the Mean Value Theorem on real-valued functions of 1-variable, for some $\lambda, \mu \in (0,1)$:
$$ \frac{u(z_0+h)-u(z_0)}{h} = \frac{b}{a+ib} u_y(a_0+a, b_0+\lambda b) + \frac{a}{a+ib} u_x(a_0+\mu a, b_0) $$
Similarly for $v(z_0+h)-v(z_0)$:
$$ \frac{v(z_0+h)-v(z_0)}{h} = \frac{b}{a+ib} v_y(a_0+a, b_0+\lambda' b) + \frac{a}{a+ib} v_x(a_0+\mu' a, b_0) $$

As $h \to 0$, we substitute these back into the limit expression. Utilizing the Cauchy-Riemann equations ($u_x = v_y$, $u_y = -v_x$) and the continuity of the partial derivatives at $z_0$, the difference between the difference quotient and $f_x(z_0)$ goes to $0$.
$$ \implies \lim_{h\to 0} \frac{f(z_0+h)-f(z_0)}{h} - f_x(z_0) = 0 $$

\vspace{1em}
\textbf{Example:} Consider $f: \mathbb{C} \to \mathbb{C}$, $f(z) = |z|^2$ i.e., $f(x,y) = x^2+y^2$. What are the points of differentiability?
Check by CR equations:
$f_x = 2x$, $f_y = 2y$.
For $f_y = i f_x \implies 2y = i 2x \implies y = ix$.
Since $x, y \in \mathbb{R}$, this is only satisfied at $z=0$ (where $x=0, y=0$).
$f_x$ and $f_y$ are continuous and exist in a neighborhood of $0$, hence $f$ is differentiable ONLY at $z=0$.

\vspace{1em}
\textbf{Holomorphicity}

We do not want such discrete points of differentiability.

\textbf{Definition:} Let $U \subseteq \mathbb{C}$ be open, $f: U \to \mathbb{C}$ be given, and $z_0 \in U$. We say $f$ is \textbf{holomorphic} at $z_0$ if there exists a neighborhood of $z_0$ where $f$ is differentiable.
A domain $D$ is an open and connected set.
$\mathcal{H}(D)$ is the set of holomorphic functions on $D$.
$f$ is holomorphic on $U$ if $f$ is holomorphic at every point of $U$ (or $f$ is diff on $U$).

\vspace{1em}
\textbf{Property 1:} Let $D$ be a domain, and $f \in \mathcal{H}(D)$ such that $f'(z) = 0$ on $D$. Then $f$ is constant.

\textbf{Lemma:} Let $D$ be a domain, and $g: D \to \mathbb{R}$ be such that $g_x, g_y$ vanish identically on $D$. Then $g$ is constant on $D$.

\textit{Proof of Property 1:} Let $z_0 \in D$.
$$ f'(z_0) = f_x(z_0) = u_x(z_0) + i v_x(z_0) = 0 $$
$$ \implies u_x(z_0) = 0 \text{ and } v_x(z_0) = 0 $$
By CR conditions ($u_y = -v_x$ and $v_y = u_x$), we get $u_y(z_0) = 0$ and $v_y(z_0) = 0$.
Thus, $u$ and $v$ are functions such that their partial derivatives vanish on $D$. By the Lemma, $u$ is constant and $v$ is constant, hence $f$ is constant.

\vspace{1em}
\textbf{To check holomorphicity:}
If $u_x, v_y, u_y, v_x$ are continuous and satisfy the CR equations ($u_x = v_y$, $u_y = -v_x$), then the function is holomorphic.
Also, if $u$ is the real part of a holomorphic function, $u_{xx} + u_{yy} = 0$ (i.e., $u$ is harmonic).

\textit{Proof of the Lemma:}
Take points $(a,b)$ and $(c,d)$ in $D$. We want to show the function's value is the same. Apply MVT:
$$ g(a',b) - g(a,b) = g_x(a'',b)(a'-a) = 0 $$
for $a < a'' < a'$. So $g(a,b) = g(a',b)$.
Similarly applying it along the y-axis, we can continue finitely to connect $(a,b)$ and $(c,d)$ with horizontal and vertical segments (since $D$ is a domain, it's path-connected by step paths). We end up with $g(a,b) = g(c,d)$. Hence $g$ is constant.

\vspace{1em}
\textbf{Exercise:} Let $D$ be a domain, and $f = u+iv \in \mathcal{H}(D)$. Prove that if $u$ is constant, then $f$ is constant.
\textit{Proof:} Since $u$ is constant, $u_x = 0$ and $u_y = 0$.
By the Cauchy-Riemann equations, $v_y = u_x = 0$ and $v_x = -u_y = 0$.
Since both $u$ and $v$ have zero partial derivatives on a domain, $v$ is also constant. Hence, $f = u+iv \in \mathcal{H}(D)$ is constant.

\textbf{Corollary:} If the image of a holomorphic function $f(\mathbb{C}) \subseteq \mathbb{R}$, then $f$ must be constant. (If the imaginary part is constant zero, the function is constant).

\vspace{1em}
\noindent \textbf{17-March}

\textbf{Theorem:} Let $D$ be a domain, and $f \in \mathcal{H}(D)$ such that $|f|$ is constant. Then $f$ is constant.
\textit{Proof:} Let $f = u+iv$. We are given that $|f|^2 = u^2 + v^2 = \text{constant}$.
If $|f|^2 = 0$, then $u^2+v^2 = 0$, which implies $u=0$ and $v=0$. Thus, $f$ is constant.
If $|f|^2 = \text{const} \neq 0$:
Differentiating $u^2+v^2 = \text{const}$ with respect to $x$ and $y$:
1) $2u u_x + 2v v_x = 0 \implies u u_x + v v_x = 0$
2) $2u u_y + 2v v_y = 0 \implies u u_y + v v_y = 0$

Using the Cauchy-Riemann equations ($u_x = v_y$ and $u_y = -v_x$), substitute into the first equation:
$$u u_x - v u_y = 0$$
$$u u_y + v u_x = 0$$
From the second equation, if $u \neq 0$, we have $u_x = -\frac{v}{u} u_y$.
Substitute this into the first equation:
$$u u_y + v \left(-\frac{v}{u} u_y\right) = 0 \implies u u_y - \frac{v^2}{u} u_y = 0 \implies u_y \left(\frac{u^2+v^2}{u}\right) = 0$$
Since $u^2+v^2 \neq 0$, we must have $u_y = 0$.
Similarly, we can show $u_x = 0$.
Thus, $u$ is constant. By the previous exercise, if the real part of a holomorphic function is constant, the function itself is constant. Hence, $f$ is constant.

\vspace{1em}
\textbf{Non-Trivial Examples of Holomorphic Functions}

\textbf{Definition (Formal Power Series):} A formal power series is an expression of the form:
$$\sum_{n \ge 0} a_n z^n$$
where $a_n \in \mathbb{C}$ and $z$ is an indeterminate.

For example, consider the geometric series:
$$1 + z + z^2 + \dots = \sum_{n \ge 0} z^n$$
We know the finite sum is:
$$1 + z + z^2 + \dots + z^n = \frac{1-z^{n+1}}{1-z}$$
If $|z| < 1$, then $|z|^{n+1} \to 0$ as $n \to \infty$. Hence, the series converges to $\frac{1}{1-z}$.
If $|z| \ge 1$, the series does not converge.
There is a threshold beyond which the power series does not converge, and below which it converges.

\textbf{Radius of Convergence (ROC)}
Let $S = \left\{ r \ge 0 \mid \sum_{n \ge 0} |a_n| r^n < \infty \right\}$.
Since $0 \in S$, $S$ is not empty.
Define $\rho = \sup S$. If it doesn't exist, we set $\rho = \infty$.
The quantity $\rho$ is called the radius of convergence of the formal power series.
$S$ is an interval of the form $[0, \rho)$ or $[0, \rho]$.
The set $\{z \in \mathbb{C} \mid |z| < \rho\}$ is called the disc of convergence.

For example, for $\sum z^n$, $S = [0, 1)$. $\sup S = 1 \implies \rho = 1$.

\vspace{1em}
\textbf{Convergence of a Formal Power Series}

\textbf{Definition (Normal Convergence):}
Let $f_n: X \to \mathbb{C}$ be a sequence of functions on a set $X$. Define the supremum norm:
$$\|f_n\|_X = \sup_{x \in X} |f_n(x)|$$
We say $\sum_{n \ge 1} f_n$ is normally summable (or converges normally) on $X$ if:
$$\sum_{n \ge 1} \|f_n\|_X < \infty$$

\textit{Properties:}
1. Normal convergence implies absolute convergence of $\sum f_n(x)$ for any $x \in X$.
2. Normal convergence implies uniform convergence (by Weierstrass M-test). Normal convergence $\implies \sum \sup|f_n(x)|$ converges, and since $|f_n(x)| \le \sup|f_n(x)|$, the series $\sum f_n(x)$ converges uniformly.

However, uniform convergence does NOT imply normal convergence.
Consider $f_n(x) = \frac{x^n}{n}$ on $X = (0,1)$.
For some $a \in (0,1)$, we have $\left| \frac{x^n}{n} \right| \le \frac{a^n}{n}$.
Since $\sum \frac{a^n}{n}$ converges (by comparison with the geometric series), by the Weierstrass M-test, $\sum \frac{x^n}{n}$ converges uniformly on $[0, a]$.
But, if we look at the supremum on $X=(0,1)$:
$$\sup_{x \in (0,1)} \left(\frac{x^n}{n}\right) = \frac{1}{n}$$
The sum $\sum \sup \left(\frac{x^n}{n}\right) = \sum \frac{1}{n}$, which diverges as $n \to \infty$ (Harmonic series). Hence, it is not normally convergent on $(0,1)$.

\vspace{1em}
\textbf{Theorem:} Consider a formal power series $\sum_{n \ge 0} a_n z^n$. Let $\rho$ be the radius of convergence. Then for any $r < \rho$, the series converges normally on the closed disk $D = \{z \mid |z| \le r\}$. The series does not converge for $|z| > \rho$.

\textbf{Abel's Lemma:} Suppose $\sum_{n \ge 0} a_n z_0^n$ converges for some $z_0 \neq 0$. Let $r_0 = |z_0|$. Then for any $r < r_0$, the series $\sum a_n z^n$ converges normally on $\{z \mid |z| \le r\}$.

\textit{Proof of Abel's Lemma:}
If $\sum a_n z_0^n$ converges, then the terms must go to zero: $a_n z_0^n \to 0$ as $n \to \infty$.
This implies the sequence is bounded, so $\exists M > 0$ such that $|a_n r_0^n| < M$ for all sufficiently large $n$.
Then for the series on $D = \{z \mid |z| \le r\}$ where $r < r_0$:
$$\|a_n z^n\|_D \le |a_n| r^n = |a_n| r_0^n \left(\frac{r}{r_0}\right)^n \le M \left(\frac{r}{r_0}\right)^n$$
Summing this yields:
$$\sum_{n \ge 0} \|a_n z^n\|_D \le \sum_{n \ge 0} M \left(\frac{r}{r_0}\right)^n = M \left( \frac{1}{1 - r/r_0} \right) < \infty$$
because it's a geometric series with ratio $r/r_0 < 1$.

\textit{Proof of Theorem:}
Let $0 \le r < \rho$ be given. By the definition of the supremum $\rho$, there exists $r_0 \in S$ such that $r < r_0 < \rho$.
By the definition of $S$, we have $\sum_{n \ge 0} |a_n| r_0^n < \infty$.
This implies $|a_n| r_0^n \to 0$, so $\exists M$ such that $|a_n| r_0^n \le M$ for all $n \ge 0$.
By Abel's lemma, the series $\sum a_n z^n$ is normally convergent on $\{z \mid |z| \le r\}$.

Now let $|z| > \rho$. We want to show that $\sum_{n \ge 0} a_n z^n$ does not converge.
We will show that the sequence $(a_n z^n)$ is not bounded, and hence the series cannot converge.
Suppose towards contradiction that $|a_n z^n| < M$ for all $n \ge 0$.
Choose $R$ such that $\rho < R < |z|$.
$$|a_n R^n| = |a_n| |z|^n \left(\frac{R}{|z|}\right)^n \le M \left(\frac{R}{|z|}\right)^n$$
Since $R < |z|$, the sum $\sum |a_n| R^n$ is bounded by a convergent geometric series, so $\sum |a_n| R^n < \infty$.
This implies $R \in S$, which means $R \le \sup S = \rho$. But we chose $R > \rho$. This is a contradiction.
\end{document}

\textbf{Formula (Hadamard):} For a formal power series $\sum_{n \ge 0} a_n z^n$, its Radius of Convergence $\rho$ is given by:
$$ \frac{1}{\rho} = \limsup_{n \to \infty} |a_n|^{1/n} $$

Another formula: Suppose $\lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right|$ exists in $[0, \infty) \cup \{\infty\}$. Then $\rho = \lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right|$.

\vspace{1em}
\textbf{Differentiability of Power Series}

\textbf{Theorem:} Let $\sum_{n \ge 0} a_n z^n$ be a formal power series with ROC $\rho > 0$. Then:
1. The formal power series $\sum_{n \ge k} a_n n(n-1)\dots(n-k+1)z^{n-k}$ has ROC $\rho$.
2. For any $a \in \mathbb{C}$, the function $f(z) = \sum_{n \ge 0} a_n (z-a)^n$ is infinitely differentiable in $B(a, \rho) = \{z \in \mathbb{C} \mid |z-a| < \rho\}$, and
$$ f^{(k)}(z) = \sum_{n \ge k} a_n n(n-1)\dots(n-k+1)(z-a)^{n-k} $$
for all $k \ge 1$ and $|z-a| < \rho$.
3. For any $n \ge 0$, we have $a_n = \frac{f^{(n)}(a)}{n!}$.

\textit{Proof:}
It is equivalent to proving for $k=1$, i.e., showing the ROC of $\sum_{n \ge 1} a_n n z^{n-1}$ is $\rho$. Let its ROC be $\rho_0$.
We know from real analysis that if $x_n, y_n \ge 0$, and $\lim y_n = L > 0$, then $\limsup (x_n y_n) = L \limsup x_n$.
Using Hadamard's formula:
$$ \frac{1}{\rho_0} = \limsup_{n \to \infty} |n a_n|^{1/n} = \limsup_{n \to \infty} n^{1/n} |a_n|^{1/n} $$
Since $\lim_{n \to \infty} n^{1/n} = 1$, we get $\frac{1}{\rho_0} = \limsup_{n \to \infty} |a_n|^{1/n} = \frac{1}{\rho}$. Thus $\rho_0 = \rho$.

Alternatively, we can show $\rho_0 = \rho$ by bounding.
Let $0 \le r < \rho_0$. Then $\sum_{n \ge 1} |a_n| n r^{n-1} < \infty$.
Since $n \ge 1$, we have $|a_n| r^{n-1} \le |a_n| n r^{n-1}$, which implies $\sum_{n \ge 1} |a_n| r^{n-1} < \infty$.
Multiplying by $r$, $\sum_{n \ge 1} |a_n| r^n < \infty$. Adding $|a_0|$, we get $\sum_{n \ge 0} |a_n| r^n < \infty$.
This means $r \le \rho$. Thus $\rho_0 \le \rho$.
Now let $0 \le r < \rho$. We want to show $\sum_{n \ge 1} |a_n| n r^{n-1} < \infty$. We can pick $R$ such that $r < R < \rho$, and proceed similarly to show convergence, leading to $\rho \le \rho_0$. Hence $\rho = \rho_0$.

To prove part 2, we must show that $f'(z) = \sum_{n \ge 1} a_n n (z-a)^{n-1}$ on $B(a, \rho)$. Let $g(z) = \sum_{n \ge 1} a_n n (z-a)^{n-1}$.
Let $w \in B(a, \rho)$, so $|a-w| < \rho$. Choose $r$ such that $|a-w| < r < \rho$.
We analyze the difference quotient:
$$ \frac{f(z)-f(w)}{z-w} - g(w) $$
Let $S_n(z) = \sum_{k=0}^n a_k(z-a)^k$ and the tail $R_n(z) = \sum_{k>n} a_k(z-a)^k$. Then $f(z) = S_n(z) + R_n(z)$.
$$ \frac{f(z)-f(w)}{z-w} - g(w) = \frac{S_n(z)-S_n(w)}{z-w} + \frac{R_n(z)-R_n(w)}{z-w} - g(w) $$
$$ = \left( \frac{S_n(z)-S_n(w)}{z-w} - S_n'(w) \right) + (S_n'(w) - g(w)) + \left( \frac{R_n(z)-R_n(w)}{z-w} \right) $$

Let's bound the third term:
$$ \frac{R_n(z)-R_n(w)}{z-w} = \frac{1}{z-w} \sum_{k>n} a_k \{(z-a)^k - (w-a)^k\} $$
Using the algebraic identity $x^k - y^k = (x-y)(x^{k-1} + x^{k-2}y + \dots + y^{k-1})$:
$$ \frac{(z-a)^k - (w-a)^k}{(z-a) - (w-a)} = (z-a)^{k-1} + (z-a)^{k-2}(w-a) + \dots + (w-a)^{k-1} $$
Since $|z-a| < r$ and $|w-a| < r$, the absolute value of this sum is strictly less than $k r^{k-1}$.
Thus, the third term is bounded by:
$$ \left| \frac{R_n(z)-R_n(w)}{z-w} \right| \le \sum_{k>n} |a_k| k r^{k-1} $$
This is the tail of the convergent series $\sum_{k \ge 1} |a_k| k r^{k-1}$.
Given $\epsilon > 0$, we can choose $n_0$ such that for $n \ge n_0$, $|3^{\text{rd}}\text{ term}| < \epsilon/3$.

For the second term, $S_n'(w) = \sum_{k=1}^n k a_k (w-a)^{k-1}$.
The sequence of partial sums converges to $g(w) = \sum_{k=1}^\infty k a_k (w-a)^{k-1}$.
Thus, we can choose $n_1$ such that for $n \ge n_1$, $|2^{\text{nd}}\text{ term}| = |S_n'(w) - g(w)| < \epsilon/3$.

Let $N = \max\{n_0, n_1\}$. For this fixed $N$, we have $|2^{\text{nd}}\text{ term}| + |3^{\text{rd}}\text{ term}| < 2\epsilon/3$.
Now consider the first term. Since $S_N(z)$ is a polynomial, it is differentiable at $w$, with derivative $S_N'(w)$.
We can choose $\delta > 0$ such that for all $z \in B(w, \delta)$:
$$ \left| \frac{S_N(z)-S_N(w)}{z-w} - S_N'(w) \right| < \epsilon/3 $$
Hence, for all $z \in B(w, \delta)$, we have:
$$ \left| \frac{f(z)-f(w)}{z-w} - g(w) \right| < \frac{\epsilon}{3} + \frac{\epsilon}{3} + \frac{\epsilon}{3} = \epsilon $$
This proves that $f$ is differentiable at $w$ and $f'(w) = g(w)$.

To prove part 3, we evaluate $f^{(k)}(z)$ at $z=a$:
$$ f^{(k)}(a) = a_k \cdot k(k-1)\dots(1) \cdot (a-a)^0 + 0 = a_k k! $$
$$ \implies a_k = \frac{f^{(k)}(a)}{k!} $$

\textbf{Corollary:} Let $\sum a_n z^n$ be a formal power series with ROC $\rho > 0$. Then for any $a \in \mathbb{C}$, the function $f(z) := \sum_{n \ge 0} a_n (z-a)^n$ defines a holomorphic function on $B(a, \rho)$.

\vspace{1em}
\textbf{Example (Exponential Function):}
Let $a_n = \frac{1}{n!}$. The series is $\sum_{n \ge 0} \frac{z^n}{n!}$.
The ratio is $\left| \frac{a_n}{a_{n+1}} \right| = \frac{(n+1)!}{n!} = n+1$.
As $n \to \infty$, $n+1 \to \infty$. Thus $\rho = +\infty$.
The series converges for every $z \in \mathbb{C}$.
For $z \in \mathbb{C}$, the function given by:
$$ e^z = \sum_{n \ge 0} \frac{z^n}{n!} $$
is a holomorphic function on $\mathbb{C}$.

A function which is holomorphic on $\mathbb{C}$ is called an entire function.
Eg) Polynomials, exponential functions.

$$ e^z = \sum_{n \ge 0} \frac{z^n}{n!} $$
The derivative is also:
$$ (e^z)' = \sum_{n \ge 1} n \frac{z^{n-1}}{n!} = \sum_{n \ge 0} \frac{z^n}{n!} = e^z $$

Property: $e^{z_1+z_2} = e^{z_1}e^{z_2}$
\textit{Proof:} Let $g(z) = e^z e^{z_0-z}$.
Since coefficients of the power series are real, we have $\overline{e^z} = e^{\overline{z}}$.
$$ g'(z) = e^z e^{z_0-z} - e^z e^{z_0-z} = 0 $$
Since $g'(z) = 0$, $g(z)$ is constant.
$$ \implies g(0) = e^{z_0} \implies e^z e^{z_0-z} = e^{z_0} $$

Also, modulus of the exponential function:
$$ |e^z|^2 = e^z \overline{e^z} = e^z e^{\overline{z}} = e^{z+\overline{z}} = e^{2\text{Re}(z)} $$
Let $z = x+iy$,
$$ e^z = e^x \cdot e^{iy} = |e^z| e^{iy} $$
$$ \implies |e^z| = e^{\text{Re}(z)} $$

$e^z$ takes all complex values except $0$.
\textbf{Remark:} Real exponential function is injective. Complex exponential function is NOT injective.
$$ e^{z+2\pi i} = e^z $$
$$ (\because e^{iy} = e^{i(y+2\pi)} \text{ i.e. } e^z = e^{z+i 2n\pi}, n \in \mathbb{Z}) $$

\vspace{1em}
\noindent \textbf{20-March}

\textbf{Cosine and Sine Functions}
$$ \cos z = 1 - \frac{z^2}{2!} + \frac{z^4}{4!} - \dots + (-1)^n \frac{z^{2n}}{(2n)!} + \dots $$
$$ \sin z = z - \frac{z^3}{3!} + \frac{z^5}{5!} - \dots + (-1)^n \frac{z^{2n+1}}{(2n+1)!} + \dots $$
Since $\lim_{n \to \infty} (n!)^{1/n} = \infty$, the radius of convergence for both is infinite (they are entire functions). They have the same value in every vertical strip of width $2\pi$.

$$ (\cos z)' = -\sin z, \quad (\sin z)' = \cos z $$
Using Euler's formula:
$$ \cos z = \frac{e^{iz} + e^{-iz}}{2}, \quad \sin z = \frac{e^{iz} - e^{-iz}}{2i} $$
$$ \cos^2 z + \sin^2 z = 1 \quad \forall z \in \mathbb{C} $$

\vspace{1em}
\textbf{Logarithmic Functions}

We try to find a function $f(z)$ s.t. $e^{f(z)} = z$.
Note: the exponential function does not take the value $0$. Thus, $f$ can be defined only for non-zero $z$.
For example, if $e^{f(z)} = z$, then $e^{f(z)+2\pi in} = z$ for any $n \in \mathbb{Z}$.
The choice of $f$ is NOT unique.

Suppose $f(z) = u(z) + iv(z)$.
$$ e^{f(z)} = e^{u(z)}e^{iv(z)} = z = |z|e^{i\theta} $$
Equating magnitude and phase:
$$ e^{u(z)} = |z| \implies u(z) = \log|z| \quad (\text{real logarithm}) $$
$$ v(z) = \theta + 2\pi n, \quad n \in \mathbb{Z} $$
We define $\theta = \text{Arg}(z)$, which gives $v(z) = \text{Arg}(z) + 2\pi n$.
$$ f(z) = \log|z| + i(\text{Arg}(z) + 2\pi n) $$
The Principal argument is chosen such that $\text{Arg}(z) \in (-\pi, \pi]$.
Let us take $n=0$: $f(z) = \log|z| + i\text{Arg}(z)$.

We check whether $f$ is continuous or not. Note that $\text{Arg}(z)$ is NOT continuous at the negative real axis.

\textbf{Branch of Logarithm}
\textbf{Definition:} We say that a continuous function $f(z)$, defined on a domain $D$ s.t. $0 \notin D$, is a \textit{branch of log} on $D$ if for all $z \in D$, we have $e^{f(z)} = z$.
Eg) $D = \{r e^{i\theta} \mid r>0, \theta \in (\alpha, \alpha+2\pi), \alpha \in \mathbb{R}\}$.
$$ f(r e^{i\theta}) = \log r + i\theta + i2\pi n $$

\textbf{Principal branch of logarithm:}
$$ D = \{r e^{i\theta} \mid r>0, \theta \in (-\pi, \pi)\} $$
$$ \log(r e^{i\theta}) = \log r + i\theta $$

\textbf{Property:} Let $f$ be a branch of log on a domain $D$, then any other branch of log on $D$ looks like $f(z) + 2\pi i n$.
\textit{Proof:} Let $g$ be another branch of log on $D$.
$$ e^{f(z)} = z = e^{g(z)} $$
$$ \implies e^{f(z)-g(z)} = 1 $$
$$ f(z) - g(z) = 2\pi i n \quad \text{for some } n \in \mathbb{Z} $$
So $f(z) - g(z)$ takes values in the set $2\pi i \mathbb{Z}$.
Since $f, g$ are continuous on $D$, the image $\text{Img}(f(z)-g(z))$ must be connected.
But only connected subsets of $2\pi i \mathbb{Z}$ are singletons.
Hence, $f(z) - g(z)$ must be constant.
If $f(z) - g(z) = 2\pi i n_0$, then $g(z) = f(z) - 2\pi i n_0$.

We now prove that continuity of log is enough to give us holomorphicity.

\textbf{Theorem:} Let $U, V$ be open subsets of $\mathbb{C}$. Let $f: U \to \mathbb{C}$ and $g: V \to \mathbb{C}$ be continuous functions s.t. $f(U) \subseteq V$, and $g(f(z)) = z$ for all $z \in U$. If $g$ is holomorphic on $V$ and $g'$ does not vanish, then $f$ is holomorphic on $U$ and:
$$ f'(z) = \frac{1}{g'(f(z))} $$

\textbf{Corollary:} Branches of logs are holomorphic.
\textit{Proof:} Here $g$ is the exponential function, which is holomorphic and non-vanishing (does not take the value 0). Therefore, a branch of log is holomorphic, and:
$$ f'(z) = \frac{1}{e^{f(z)}} = \frac{1}{z} $$

\textit{Proof of theorem:}
Given $g \circ f(z) = z$ on $U$, it follows that $f$ is injective.
Let $a \in U$. We want to show $f$ is differentiable at $a$, i.e., that the limit $\lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$ exists and is equal to $\frac{1}{g'(f(a))}$.
We can manipulate the difference quotient:
$$ \frac{f(a+h) - f(a)}{h} = \frac{1}{\frac{h}{f(a+h) - f(a)}} = \frac{1}{\frac{g(f(a+h)) - g(f(a))}{f(a+h) - f(a)}} $$
Now as $h \to 0$, $f(a+h) - f(a) \to 0$ (due to the continuity of $f$).
Because $f$ is injective, $f(a+h) - f(a) \neq 0$ for $h \neq 0$.
The limit of the denominator as $h \to 0$ is precisely the derivative $g'(f(a))$.
Hence:
$$ \lim_{h \to 0} \frac{f(a+h) - f(a)}{h} = \frac{1}{g'(f(a))} $$

\textit{Proof of theorem continued:}

We can rewrite the difference quotient as:
$$ \frac{f(a+h) - f(a)}{h} = \frac{1}{\frac{h}{f(a+h) - f(a)}} = \frac{1}{\frac{g(f(a+h)) - g(f(a))}{f(a+h) - f(a)}} $$
Now as $h \to 0$, $f(a+h) - f(a) \to 0$ (because of the continuity of $f$).
Since $f$ is injective, $f(a+h) - f(a) \neq 0$ for $h \neq 0$.
Taking the limit $h \to 0$, the denominator becomes the derivative of $g$ evaluated at $f(a)$.
Hence,
$$ \lim_{h \to 0} \frac{f(a+h) - f(a)}{h} = \frac{1}{g'(f(a))} $$

\vspace{1em}
\noindent \textbf{24-March}

\textbf{Logarithm}
We want to find $f(z)$ such that $e^{f(z)} = z$.
The domain of $f$ must avoid $0$.
$$ f(z) = \log|z| + i\text{Arg}(z) $$
where $\text{arg}(z) \in (\alpha, \alpha+2\pi)$. For the principal branch, $\text{Arg}(z) \in (-\pi, \pi]$.
A branch of the logarithm is a continuous function, and we proved that a branch of log is holomorphic.
$$ f(z) = \log z \implies f'(z) = 1/z \quad \text{for } z \neq 0 $$

We can write $z = 1+w$, where $w \neq -1$.
$$ f'(1+w) = \frac{1}{1+w} = 1 - w + w^2 - w^3 + w^4 - \dots $$
valid for $|w| < 1$.
We try to find one formal power series whose derivative is the above one.
Integrating term by term:
$$ w - \frac{w^2}{2} + \frac{w^3}{3} - \frac{w^4}{4} + \frac{w^5}{5} - \dots $$
Put $f(1+w) = w - \frac{w^2}{2} + \frac{w^3}{3} - \frac{w^4}{4} + \dots$
For the principal branch of log, we have a radius of convergence (ROC) = 1.
$$ \log(1+z) = z - \frac{z^2}{2} + \frac{z^3}{3} - \frac{z^4}{4} + \dots \quad \text{for } |z| < 1 $$

Any holomorphic function has a power series expansion around any point $z_0$:
$$ f(z) = \sum_{n=0}^{\infty} a_n(z-z_0)^n $$

\vspace{1em}
\textbf{Complex Integration}

Recall Riemann Integration on $[a,b]$ in $\mathbb{R}$. We want to extend this to Integration on a Path.

\textbf{Definition:} Let $U$ be an open subset of $\mathbb{C}$. By a \textit{path} in $U$, we mean a continuous function $\gamma: [a,b] \to U$ for some $a < b$ in $\mathbb{R}$.
We call a path to be \textit{smooth} if for each $t \in (a,b)$, $\gamma'(t)$ exists and $\gamma': [a,b] \to \mathbb{C}$ is continuous.
We call it \textit{piecewise smooth} if there exists a partition $P = \{a=t_0 < t_1 < \dots < t_n=b\}$ such that $\gamma$ is smooth on each subinterval $[t_{i-1}, t_i]$.

\textbf{Theorem:} Let $\gamma: [a,b] \to \mathbb{C}$ be a piecewise smooth path. Then ($\gamma$ is of bounded variation) and
$$ \int_a^b |\gamma'(t)| dt \text{ is finite.} $$
This quantity is called the length of $\gamma$, denoted $L_\gamma$.

\textbf{Theorem (Riemann-Stieltjes Integral):}
Let $\gamma: [a,b] \to \mathbb{C}$ be a piecewise smooth path and let $f: [a,b] \to \mathbb{C}$ be a continuous function.
Then for any $\epsilon > 0$, $\exists \delta > 0$ so that whenever we take a partition $a = t_0 < t_1 < \dots < t_n = b$ of $[a,b]$ of length $|t_{k+1}-t_k| < \delta$, we have:
$$ \left| I - \sum_{k=0}^{n-1} f(\tilde{t}_k)(\gamma(t_{k+1}) - \gamma(t_k)) \right| < \epsilon $$
where $\tilde{t}_k \in [t_k, t_{k+1}]$.
The number $I$ is called the integral of $f$ w.r.t $\gamma$ over $[a,b]$. In fact, we have:
$$ I = \int_a^b f(t)\gamma'(t)dt $$

Let $f: U \to \mathbb{C}$ be a continuous function and $\gamma: [a,b] \to U$ be a piecewise smooth path.
Then the composition $f \circ \gamma: [a,b] \to \mathbb{C}$ is continuous.

\textbf{Definition:} Let $\gamma: [a,b] \to U$ be a piecewise smooth path and $f: U \to \mathbb{C}$ be continuous. Then the (path) integral of $f$ along $\gamma$ is denoted by $\int_\gamma f(z) dz$ and is defined to be:
$$ \int_\gamma f(z) dz = \int_a^b f(\gamma(t)) \gamma'(t) dt $$

\textbf{Easy Observation (Linearity of Integration):}
$$ \int_\gamma (cf + g) dz = c \int_\gamma f(z) dz + \int_\gamma g(z) dz $$

\textbf{Example:} Let $\gamma: [0,1] \to \mathbb{C}$ be given by $\gamma(t) = e^{2\pi i t}$, which traces the unit circle counterclockwise. Let $f_m(z) = z^m$.
What is $\int_\gamma f_m(z) dz$?

Let $m = -1$, so $f_{-1}(z) = 1/z$.
$$ \int_\gamma \frac{1}{z} dz = \int_0^1 \frac{1}{e^{2\pi i t}} (2\pi i e^{2\pi i t}) dt = \int_0^1 2\pi i dt = 2\pi i $$

For general $m \neq -1$:
$$ \int_\gamma z^m dz = \int_0^1 (e^{2\pi i t})^m (2\pi i e^{2\pi i t}) dt = 2\pi i \int_0^1 e^{2\pi i(m+1)t} dt $$
$$ = 2\pi i \int_0^1 [\cos(2\pi(m+1)t) + i\sin(2\pi(m+1)t)] dt $$
Since the integral of sine and cosine over a full period is $0$, we get:
$$ = 2\pi i (0 + 0) = 0 $$
So, $\int_\gamma z^m dz = 0$ for $m \neq -1$.

\vspace{1em}
\noindent \textbf{27-March}

\textbf{Basic Properties}

\textbf{Definition:} Two smooth paths $\gamma_1: [a,b] \to \mathbb{C}$ and $\gamma_2: [c,d] \to \mathbb{C}$ are called equivalent if there exists a one-one $C^1$-function $\lambda: [c,d] \to [a,b]$ such that $\lambda(c) = a, \lambda(d) = b$ and
$$ \gamma_2(t) = \gamma_1(\lambda(t)) \quad \text{for } t \in [c,d]. $$
We denote this by $\gamma_1 \sim \gamma_2$.

\textbf{Theorem:} If $\gamma_1 \sim \gamma_2$, then $\int_{\gamma_1} f(z) dz = \int_{\gamma_2} f(z) dz$.
\textit{Proof:} We want to show $\int_{\gamma_1} f(z) dz = \int_{\gamma_2} f(z) dz$.
Write $f = u+iv$ and $\gamma_1 = \alpha_1 + i\beta_1$.
$$ \int_{\gamma_1} f(z) dz = \int_a^b f(\gamma_1(t))\gamma_1'(t) dt = \int_a^b (u(\gamma_1(t)) + iv(\gamma_1(t)))(\alpha_1'(t) + i\beta_1'(t)) dt $$
Since $\gamma_2 = \gamma_1 \circ \lambda$, we have $\alpha_2 = \alpha_1 \circ \lambda$ and $\beta_2 = \beta_1 \circ \lambda$.
Consider the real part of the integral involving $\gamma_2$:
$$ \int_c^d u(\gamma_2(t))\alpha_2'(t) dt = \int_c^d u(\gamma_1(\lambda(t))) (\alpha_1 \circ \lambda)'(t) dt = \int_c^d u(\gamma_1(\lambda(t))) \alpha_1'(\lambda(t))\lambda'(t) dt $$
By the change of variable $s = \lambda(t)$, $ds = \lambda'(t)dt$, and limits change from $c, d$ to $\lambda(c)=a, \lambda(d)=b$:
$$ = \int_a^b u(\gamma_1(s)) \alpha_1'(s) ds $$
Doing this for all four terms produced by the complex multiplication proves the equality. (Basically tracing the same curve but with a different parameter like diff speed or direction).

\textbf{Definition:} Let $\gamma: [a,b] \to \mathbb{C}$ be a path. Define $\tilde{\gamma}: [a,b] \to \mathbb{C}$ by:
$$ \tilde{\gamma}(t) = \gamma(b+a-t) $$
$\tilde{\gamma}$ is called the reverse path.

\textbf{Theorem:} $\int_{\tilde{\gamma}} f(z) dz = -\int_\gamma f(z) dz$.
\textit{Proof:}
$$ \int_{\tilde{\gamma}} f(z) dz = \int_a^b f(\tilde{\gamma}(t))\tilde{\gamma}'(t) dt = -\int_a^b f(\gamma(b+a-t))\gamma'(b+a-t) dt $$
Let $\lambda: [a,b] \to [a,b]$ be defined by $\lambda(t) = b+a-t$. It is a $C^1$ and injective function with $\lambda'(t) = -1$, $\lambda(a) = b$, and $\lambda(b) = a$.
$$ \int_{\tilde{\gamma}} f(z) dz = -\int_a^b f(\gamma(\lambda(t))) \gamma'(\lambda(t)) dt $$
Using change of variables $s = \lambda(t) \implies ds = \lambda'(t)dt = -dt$:
$$ = \int_b^a f(\gamma(s)) \gamma'(s) ds = -\int_a^b f(\gamma(s)) \gamma'(s) ds = -\int_\gamma f(z) dz $$

\vspace{1em}
\textbf{ML Inequality}

Recall from real analysis: $\left| \int_a^b f(t) dt \right| \le \int_a^b |f(t)| dt$.
Can we write $\left| \int_\gamma f(z) dz \right| \le \int_\gamma |f(z)| |dz|$?
The inequality would make sense if we write it as $\int_a^b |f(\gamma(t))| |\gamma'(t)| dt$.

\textbf{Theorem (ML Inequality):} Let $\gamma: [a,b] \to \mathbb{C}$ be a piecewise smooth path and $f: U \to \mathbb{C}$ be continuous. Then
$$ \left| \int_\gamma f(z) dz \right| \le M_\gamma L_\gamma $$
where $M_\gamma = \sup \{ |f(\gamma(t))| : t \in [a,b] \}$ and $L_\gamma = \int_a^b |\gamma'(t)| dt$ is the length of $\gamma$.

\textit{Proof:} We show first that for any continuous $g: [a,b] \to \mathbb{C}$, $\left| \int_a^b g(t) dt \right| \le \int_a^b |g(t)| dt$.
Let $\int_a^b g(t) dt = R e^{i\theta}$ for $R \ge 0$. Then $\left| \int_a^b g(t) dt \right| = R$.
$$ R = e^{-i\theta} \int_a^b g(t) dt = \int_a^b e^{-i\theta} g(t) dt $$
Write $e^{-i\theta} g(t) = f_1(t) + i f_2(t)$, where $f_1, f_2$ are real-valued functions.
$$ R = \int_a^b (f_1(t) + i f_2(t)) dt = \int_a^b f_1(t) dt + i \int_a^b f_2(t) dt $$
Since $R$ is real, the imaginary part must be $0$. Thus:
$$ R = \int_a^b f_1(t) dt = \int_a^b \text{Re}(e^{-i\theta} g(t)) dt $$
We know that $\text{Re}(z) \le |\text{Re}(z)| \le |z|$. Therefore:
$$ R \le \int_a^b \left| e^{-i\theta} g(t) \right| dt = \int_a^b |e^{-i\theta}| |g(t)| dt = \int_a^b |g(t)| dt $$
Now apply this to the path integral, taking $g(t) = f(\gamma(t))\gamma'(t)$:
$$ \left| \int_\gamma f(z) dz \right| = \left| \int_a^b f(\gamma(t))\gamma'(t) dt \right| \le \int_a^b |f(\gamma(t))| |\gamma'(t)| dt $$
$$ \le \int_a^b M_\gamma |\gamma'(t)| dt = M_\gamma \int_a^b |\gamma'(t)| dt = M_\gamma L_\gamma $$

\textbf{Corollary:} Let $f_n$ be a sequence of continuous functions from $U \to \mathbb{C}$. Suppose $f_n$ converges to $f$ uniformly on $U$. Then
$$ \lim_{n \to \infty} \int_\gamma f_n(z) dz = \int_\gamma f(z) dz = \int_\gamma \left( \lim_{n \to \infty} f_n(z) \right) dz $$

\textit{Proof:} We want to show that $\left| \int_\gamma f_n(z) dz - \int_\gamma f(z) dz \right|$ can be made arbitrarily small.
$$ \left| \int_\gamma f_n(z) dz - \int_\gamma f(z) dz \right| = \left| \int_\gamma (f_n(z) - f(z)) dz \right| \le \sup_{z \in \text{Im}(\gamma)} |f_n(z) - f(z)| \cdot L_\gamma $$
Given any $\epsilon > 0$, since $f_n \to f$ uniformly, $\exists n_0 \in \mathbb{N}$ such that for all $n \ge n_0$, $\|f_n - f\|_\infty < \frac{\epsilon}{L_\gamma}$ (assuming $L_\gamma > 0$).
$$ \implies \sup |f_n(z) - f(z)| \cdot L_\gamma < \left( \frac{\epsilon}{L_\gamma} \right) L_\gamma = \epsilon $$

\vspace{1em}
\noindent \textbf{28-March}

\textbf{Fundamental Theorem of Calculus (FTC)}
\textit{FTC in real analysis:} Let $f: [a,b] \to \mathbb{R}$ be a continuous function. Let $F: [a,b] \to \mathbb{R}$ be a function differentiable on $(a,b)$ with $F' = f$ on $(a,b)$. Then $\int_a^b f(x) dx = F(b) - F(a)$.

Coming back to complex analysis, NOT every continuous function on an open subset of $\mathbb{C}$ has a primitive.
\textbf{Example:} Let $f(z) = |z|^2 = x^2+y^2$. It is continuous on $\mathbb{C}$.
\textbf{Claim:} There does not exist a holomorphic function $F$ on $\mathbb{C}$ such that $F' = f$.

Suppose $F$ exists and $F = u+iv$ is holomorphic on $\mathbb{C}$. Then $F$ satisfies the CR equations: $u_x = v_y$ and $u_y = -v_x$.
$$ F' = F_x = u_x + iv_x $$
Since $F' = f(z) = x^2+y^2$, we have:
$$ u_x + iv_x = x^2+y^2 $$
As $F'$ is real-valued, we get $v_x = 0 \implies u_y = -v_x = 0$.
So $u_y = 0$, which means $u$ is a function of $x$ alone.
But we also have $u_x = x^2+y^2$, which clearly depends on $y$.
This is a contradiction!

\vspace{1em}
\textbf{Fundamental Theorem of Calculus in Complex Analysis}

\textbf{Theorem (FTC in Complex Analysis):} Let $U \subseteq \mathbb{C}$ be open, and $\gamma: [a,b] \to \mathbb{C}$ be a piecewise smooth path. If $f: U \to \mathbb{C}$ is a continuous function such that it has a primitive $F$ (i.e., $F' = f$) on $U$, then:
$$ \int_\gamma f(z) dz = F(\gamma(b)) - F(\gamma(a)) $$

\textit{Proof:}
$$ \int_\gamma f(z) dz = \int_a^b f(\gamma(t))\gamma'(t) dt = \int_a^b F'(\gamma(t))\gamma'(t) dt = \int_a^b (F \circ \gamma)'(t) dt = F(\gamma(b)) - F(\gamma(a)) $$

\textbf{Definition:} A path/curve $\gamma: [a,b] \to \mathbb{C}$ is called a \textit{simple closed curve} if $\gamma$ is injective on $[a,b)$. It is called a \textit{closed curve} if $\gamma(a) = \gamma(b)$.
For example, $\gamma(t) = e^{2\pi it}$ for $t \in [0,1]$ is a closed curve (but not simple if extended beyond the interval).

\textbf{Corollary:} If $\gamma$ is closed in the statement of the FTC, then we have:
$$ \int_\gamma f(z) dz = 0 $$

Recall:
$$ \int_\gamma z^m dz = \begin{cases} 0 & \text{if } m \neq -1 \\ 2\pi i & \text{if } m = -1 \end{cases} $$
for $\gamma(t) = e^{2\pi it}$.
We say that a closed curve is positively oriented (operated anticlockwise) if the area enclosed by the curve lies to the left as we trace the curve for increasing values of $t$.

\vspace{1em}
\textbf{Finding Primitive}

\textbf{Theorem (Triangle Theorem):} Let $f$ be a holomorphic function on $B(a,r)$. Let $\Delta$ be a triangle in $B(a,r)$. Let $\Gamma$ denote the boundary of $\Delta$. Then:
$$ \int_\Gamma f(z) dz = 0 $$

\textit{Proof:} Let $I = \int_\Gamma f(z) dz$.
Divide the triangle into $4$ smaller triangles by joining the midpoints of the sides. Let their boundaries be $\Gamma_1, \Gamma_2, \Gamma_3, \Gamma_4$, and their integrals be $I_1, I_2, I_3, I_4$.
$$ I = I_1 + I_2 + I_3 + I_4 $$
The integrals over the inner edges cancel each other out because we integrate over each inner edge in both directions.
By the triangle inequality:
$$ |I| \le |I_1| + |I_2| + |I_3| + |I_4| $$
Without loss of generality, let $I_1$ be such that $|I_1| \ge |I|/4$. Let's denote this triangle by $\Delta^{(1)}$ and its boundary by $\Gamma^{(1)}$.
The length of $\Gamma^{(1)}$ is given by $L_{\Gamma^{(1)}} = \frac{1}{2} L_\Gamma$, where $L_\Gamma$ is the length of $\Gamma$.
$$ \left| \int_{\Gamma^{(1)}} f(z) dz \right| \ge \frac{|I|}{4} $$
Continuing this process, we get a family of nested triangles $\Delta^{(k)}$ with boundary $\Gamma^{(k)}$ such that:
$$ \text{Length of } \Gamma^{(k)} = \frac{1}{2^k} L_\Gamma $$
$$ \left| \int_{\Gamma^{(k)}} f(z) dz \right| \ge \frac{1}{4^k} |I| $$

By Cantor's Intersection Theorem, there exists a point $z_0 \in \bigcap_{k=1}^\infty \Delta^{(k)}$.
Now, $f$ is holomorphic at $z_0$. We can write:
$$ f(z) = f(z_0) + (z-z_0)f'(z_0) + h(z)(z-z_0) $$
where $h(z) = \frac{f(z)-f(z_0)}{z-z_0} - f'(z_0)$. As $z \to z_0$, $h(z) \to 0$ (so $h$ is continuous at $z_0$ with $h(z_0) = 0$).
Integrating over $\Gamma^{(k)}$:
$$ \int_{\Gamma^{(k)}} f(z) dz = \int_{\Gamma^{(k)}} \left( f(z_0) + (z-z_0)f'(z_0) + h(z)(z-z_0) \right) dz $$
The functions $f(z_0)$ and $(z-z_0)f'(z_0)$ have primitives ($f(z_0)z$ and $f'(z_0)\frac{(z-z_0)^2}{2}$ respectively). Since $\Gamma^{(k)}$ is a closed curve, their integrals evaluate to $0$.
Thus:
$$ \int_{\Gamma^{(k)}} f(z) dz = \int_{\Gamma^{(k)}} h(z)(z-z_0) dz $$
Given $\epsilon > 0$, there exists $\delta > 0$ such that if $|z-z_0| < \delta$, then $|h(z)| < \epsilon$.
For sufficiently large $k$, the entire triangle $\Delta^{(k)}$ is contained within $B(z_0, \delta)$. For any $z$ on $\Gamma^{(k)}$, we have $|z-z_0| < L_{\Gamma^{(k)}}$.
Using the ML inequality:
$$ \left| \int_{\Gamma^{(k)}} f(z) dz \right| = \left| \int_{\Gamma^{(k)}} h(z)(z-z_0) dz \right| \le \max_{z \in \Gamma^{(k)}} |h(z)| \cdot \max_{z \in \Gamma^{(k)}} |z-z_0| \cdot L_{\Gamma^{(k)}} $$
$$ \le \epsilon \cdot L_{\Gamma^{(k)}} \cdot L_{\Gamma^{(k)}} = \epsilon \left( \frac{L_\Gamma}{2^k} \right)^2 = \epsilon \frac{L_\Gamma^2}{4^k} $$
Combining this with our earlier bound:
$$ \frac{|I|}{4^k} \le \left| \int_{\Gamma^{(k)}} f(z) dz \right| \le \epsilon \frac{L_\Gamma^2}{4^k} \implies |I| \le \epsilon L_\Gamma^2 $$
Since $\epsilon$ can be made arbitrarily small, we must have $|I| = 0$, which means $\int_\Gamma f(z) dz = 0$.

\vspace{1em}
\textbf{Integral Theorem / Primitive Theorem}

\textbf{Theorem:} Let $f$ be a holomorphic function on a ball $B(a,r)$. Then there exists a holomorphic function $F$ on $B(a,r)$ such that $F' = f$ on $B(a,r)$.
(Note: This theorem works on domains without holes, i.e., simply connected domains).

\textbf{Corollary (Closed Curve Theorem):} Let $f$ be a holomorphic function on $B(a,r)$. Let $\gamma: [c,d] \to B(a,r)$ be a closed piecewise smooth curve. Then $\int_\gamma f(z) dz = 0$.
\textit{Proof:} Immediate, since $f$ has a primitive $F$ on $B(a,r)$, and by FTC for closed curves, the integral is $F(\gamma(d)) - F(\gamma(c)) = 0$.

\textit{Proof of Integral Theorem:}
Set $F(z_0) = \int_{\gamma(a,z_0)} f(z) dz$, where $\gamma(a,z_0)$ is the straight line joining $a$ and $z_0$.
To show $F'(z_0) = f(z_0)$, consider $F(z_0+h) - F(z_0)$:
$$ F(z_0+h) - F(z_0) = \int_{\gamma(a,z_0+h)} f(z) dz - \int_{\gamma(a,z_0)} f(z) dz $$
By the Triangle Theorem applied to the triangle with vertices $a, z_0, z_0+h$:
$$ \int_{\gamma(a,z_0+h)} f(z) dz + \int_{\gamma(z_0+h,z_0)} f(z) dz + \int_{\gamma(z_0,a)} f(z) dz = 0 $$
$$ \implies \int_{\gamma(a,z_0+h)} f(z) dz - \int_{\gamma(a,z_0)} f(z) dz = \int_{\gamma(z_0, z_0+h)} f(z) dz $$
Therefore:
$$ \frac{F(z_0+h) - F(z_0)}{h} - f(z_0) = \frac{1}{h} \int_{\gamma(z_0, z_0+h)} f(z) dz - \frac{1}{h} \int_{\gamma(z_0, z_0+h)} f(z_0) dz $$
$$ = \frac{1}{h} \int_{\gamma(z_0, z_0+h)} (f(z) - f(z_0)) dz $$
Given $\epsilon > 0$, there exists $\delta > 0$ such that $|f(z) - f(z_0)| < \epsilon$ whenever $|z-z_0| < \delta$.
We choose $h$ such that $z_0+h \in B(z_0, \delta)$. Hence, on the segment $\gamma(z_0, z_0+h)$, we have $|f(z) - f(z_0)| < \epsilon$.
Using the ML inequality:
$$ \left| \frac{F(z_0+h) - F(z_0)}{h} - f(z_0) \right| \le \frac{1}{|h|} \cdot \epsilon \cdot |h| = \epsilon $$
Hence, $\lim_{h \to 0} \frac{F(z_0+h) - F(z_0)}{h} = f(z_0)$, which proves $F' = f$.

\vspace{1em}
\noindent \textbf{1-April}

\textbf{Aim: Power Series expansion of holomorphic function.}

Let $f \in \mathcal{H}(B(a,r))$ and $\alpha \in B(a,r)$. Define a function $g$ on $B(a,r)$ as follows:
$$ g(z) = \begin{cases} \frac{f(z)-f(\alpha)}{z-\alpha} & z \neq \alpha \\ f'(\alpha) & z = \alpha \end{cases} $$
Since $f$ is holomorphic at $\alpha$, $\lim_{z \to \alpha} g(z) = f'(\alpha) = g(\alpha)$. Thus, $g$ is continuous on $B(a,r)$.

\textbf{Theorem:} Let $\Delta$ be any triangle in $B(a,r)$ and $\Gamma$ be its boundary. Then $\int_\Gamma g(z) dz = 0$, i.e., $g$ satisfies the triangle theorem.

\textit{Proof:}
\textbf{Case 1:} If $\alpha$ sits outside $\Delta$, we see that the standard proof of the triangle theorem goes through for $g$, because $g$ is clearly holomorphic on $B(a,r) \setminus \{\alpha\}$.

\textbf{Case 2:} Suppose $\alpha$ sits on the boundary of $\Delta$.
We can split the triangle and we see that $\int_\Gamma g(z) dz = \sum_{i=1}^{3} \int_{\Gamma_i} g(z) dz$. For a sufficiently small neighborhood around $\alpha$, we can bound the integral. Since $g$ is continuous on a compact set, it is bounded by some $M$. Given $\epsilon > 0$, we can construct a small triangle around $\alpha$ with length $L$ such that $\left| \int_{\Gamma_{\text{small}}} g(z) dz \right| \le M L < \epsilon$.
Hence, $\left| \int_\Gamma g(z) dz \right| < \epsilon$, which implies the integral is $0$.

\textbf{Case 3:} $\alpha$ is inside of $\Delta$.
We can split $\Delta$ into smaller triangles such that $\alpha$ lies on their boundaries.
$$ \int_\Gamma g(z) dz = \int_{\Gamma_1} g(z) dz + \int_{\Gamma_2} g(z) dz + \dots $$
Since $\alpha$ lies on the boundaries, we can apply Case 2 individually to each smaller triangle, yielding $0$ for each sum.

\textbf{Corollary:} $g$ has a primitive on $B(a,r)$ and $\int_\gamma g(z) dz = 0$ for any closed curve $\gamma$ in $B(a,r)$.

\vspace{1em}
\textbf{Cauchy Integral Formula}

\textbf{Theorem:} Let $f \in \mathcal{H}(B(a,r))$ and $\alpha \in B(a,r)$. Let $\gamma_\rho$ be a circular path centered at $a$ with radius $\rho$ such that $|\alpha-a| < \rho < r$. Then:
$$ f(\alpha) = \frac{1}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{z-\alpha} dz $$
This shows that the value of $f$ at any interior point $\alpha$ is determined by its values on the boundary circle.

\textit{Proof:}
We know that $g(z)$ integrates to $0$ over closed curves in $B(a,r)$.
$$ \int_{a+\gamma_\rho} g(z) dz = 0 $$
$$ \implies \int_{a+\gamma_\rho} \frac{f(z)-f(\alpha)}{z-\alpha} dz = 0 $$
$$ \implies \int_{a+\gamma_\rho} \frac{f(z)}{z-\alpha} dz - f(\alpha) \int_{a+\gamma_\rho} \frac{1}{z-\alpha} dz = 0 $$
$$ \implies f(\alpha) \int_{a+\gamma_\rho} \frac{1}{z-\alpha} dz = \int_{a+\gamma_\rho} \frac{f(z)}{z-\alpha} dz $$
We can compute the integral of $\frac{1}{z-\alpha}$ over the circle:
$$ \frac{1}{z-\alpha} = \frac{1}{(z-a) - (\alpha-a)} = \frac{1}{z-a} \cdot \frac{1}{1 - \frac{\alpha-a}{z-a}} $$
Since $z$ is on $a+\gamma_\rho$, $|z-a| = \rho$. Because $\alpha$ is strictly inside, $|\alpha-a| < \rho$, so $\left| \frac{\alpha-a}{z-a} \right| < 1$.
We can expand this as a uniformly convergent geometric series on the curve:
$$ \frac{1}{z-\alpha} = \sum_{n=0}^{\infty} \frac{(\alpha-a)^n}{(z-a)^{n+1}} $$
Integrating term by term (justified by uniform convergence):
$$ \int_{a+\gamma_\rho} \frac{1}{z-\alpha} dz = \sum_{n=0}^{\infty} (\alpha-a)^n \int_{a+\gamma_\rho} \frac{1}{(z-a)^{n+1}} dz $$
We know that $\int_{a+\gamma_\rho} (z-a)^m dz$ is $2\pi i$ if $m = -1$ and $0$ otherwise.
Thus, only the $n=0$ term survives:
$$ \int_{a+\gamma_\rho} \frac{1}{z-\alpha} dz = (\alpha-a)^0 \cdot 2\pi i = 2\pi i $$
Substituting this back yields the Cauchy Integral Formula:
$$ f(\alpha) \cdot 2\pi i = \int_{a+\gamma_\rho} \frac{f(z)}{z-\alpha} dz \implies f(\alpha) = \frac{1}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{z-\alpha} dz $$

\vspace{1em}
\textbf{Corollary (Power Series Expansion):}
Let $f \in \mathcal{H}(B(a,r))$. Then $f$ has a power series expansion $f(z) = \sum_{n \ge 0} a_n (z-a)^n$ for any $z \in B(a,r)$.

\textit{Proof:}
Let $\alpha \in B(a,r)$. There exists $\rho > 0$ such that $|\alpha-a| < \rho < r$.
By the Cauchy Integral Formula:
$$ f(\alpha) = \frac{1}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{z-\alpha} dz $$
Using the same geometric series expansion for $\frac{1}{z-\alpha}$ (which converges uniformly on $a+\gamma_\rho$):
$$ f(\alpha) = \frac{1}{2\pi i} \int_{a+\gamma_\rho} f(z) \sum_{n=0}^{\infty} \frac{(\alpha-a)^n}{(z-a)^{n+1}} dz $$
Interchanging the sum and integral (due to uniform convergence):
$$ f(\alpha) = \sum_{n=0}^{\infty} (\alpha-a)^n \left( \frac{1}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{(z-a)^{n+1}} dz \right) $$
Let $a_n = \frac{1}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{(z-a)^{n+1}} dz$. Then:
$$ f(\alpha) = \sum_{n=0}^{\infty} a_n (\alpha-a)^n $$
Inside $B(a,r)$, renaming $\alpha$ to $z$, we have $f(z) = \sum_{n \ge 0} a_n (z-a)^n$.
From the properties of power series, we know $a_n = \frac{f^{(n)}(a)}{n!}$.
Thus, $a_n$ is independent of the choice of $\rho$, and we get:
$$ f^{(n)}(a) = \frac{n!}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{(z-a)^{n+1}} dz $$

\vspace{1em}
\textbf{Definition:} Let $U \subseteq \mathbb{C}$ be open. A function $f: U \to \mathbb{C}$ is said to be \textbf{analytic} on $U$ if for any $a \in U$, there exists $r > 0$ such that $B(a,r) \subseteq U$ and $f(z) = \sum_{k=0}^{\infty} a_k (z-a)^k$ for all $z \in B(a,r)$.

\textbf{Important Consequence:} In complex analysis, Holomorphic $\iff$ Analytic.
This tells us that any holomorphic function is infinitely differentiable.

\textbf{Remark:} This is NOT true in real analysis. We can have a $C^\infty$ function on $\mathbb{R}$ which is NOT analytic.
Example:
$$ f(x) = \begin{cases} e^{-1/x} & x > 0 \\ 0 & x \le 0 \end{cases} $$
Here, $f^{(n)}(0) = 0$ for all $n$, so its Taylor series is identically $0$, which does not equal $f(x)$ for $x > 0$.

\vspace{1em}
\noindent \textbf{2-April}

\textbf{Morera's Theorem}
Let $U \subseteq \mathbb{C}$ be open, and $f$ be continuous on $U$. Suppose that for every triangle $\Delta$ with boundary $\Gamma$ in $U$, $\int_\Gamma f(z) dz = 0$. Then $f \in \mathcal{H}(U)$.

\textit{Proof:}
Let $a \in U$. Consider a ball $B(a,r) \subseteq U$.
The hypothesis tells us that $f$ satisfies the conclusion of the triangle theorem on $B(a,r)$.
By the integral theorem, this implies that $f$ has a primitive on $B(a,r)$, i.e., there exists $F \in \mathcal{H}(B(a,r))$ such that $F' = f$.
Since $F$ is holomorphic, it is analytic, which means it is infinitely differentiable.
Therefore, $f$, being the derivative of a holomorphic function $F$, is also differentiable.
Hence, $f \in \mathcal{H}(B(a,r))$. Since this holds for any $a \in U$, $f \in \mathcal{H}(U)$.

Suppose $f \in \mathcal{H}(B(a,r))$ and $\alpha \in B(a,r)$.
We know $f$ has a power series expansion:
$$ f(z) = \sum_{k \ge 0} a_k (z-a)^k $$
There exists $\rho > 0$ such that $B(\alpha, \rho) \subset B(a,r)$.
Expanding around $\alpha$:
$$ f(z) = a_0 + a_1(z-\alpha) + \sum_{k \ge 2} a_k(z-\alpha)^k $$
Here, $a_0 = f(\alpha)$ and $a_1 = f'(\alpha)$.
Then,
$$ f(z) - f(\alpha) = a_1(z-\alpha) + \sum_{k \ge 2} a_k(z-\alpha)^k $$
$$ \implies \frac{f(z) - f(\alpha)}{z-\alpha} = a_1 + \sum_{k \ge 2} a_k(z-\alpha)^{k-1} $$
This power series converges, proving that the difference quotient is holomorphic and can be integrated term by term.
Integrating over a closed path $\alpha + \gamma_\rho$:
$$ \int_{\alpha+\gamma_\rho} \frac{f(z)-f(\alpha)}{z-\alpha} dz = \sum_{k \ge 0} c_k \int_{\alpha+\gamma_\rho} (z-\alpha)^k dz = 0 $$
since the integral of $(z-\alpha)^k$ over a closed curve is $0$ for $k \ge 0$.

\vspace{1em}
\textbf{Uniform Limit of Holomorphic Functions is Holomorphic}

Let $U \subseteq \mathbb{C}$ be open, and $f_n, f: U \to \mathbb{C}$ be functions.
Suppose $f_n \to f$ uniformly on $U$, and $f_n \in \mathcal{H}(U)$. Then $f \in \mathcal{H}(U)$.
(Note: This is NOT true in real analysis).

\textit{Proof:}
Since $f_n \in \mathcal{H}(U)$, the functions $f_n$ are continuous. The uniform limit of continuous functions is continuous, so $f$ is continuous.
By Morera's theorem, it is equivalent to proving that for any triangle $\Delta \subset U$, $\int_\Delta f(z) dz = 0$.
$$ \int_\Delta f(z) dz = \int_\Delta \left( \lim_{n \to \infty} f_n(z) \right) dz $$
Because the convergence is uniform, we can interchange the limit and the integral:
$$ = \lim_{n \to \infty} \int_\Delta f_n(z) dz $$
Since each $f_n$ is holomorphic, by the Triangle Theorem, $\int_\Delta f_n(z) dz = 0$.
$$ = \lim_{n \to \infty} 0 = 0 $$
Hence, $f \in \mathcal{H}(U)$.
\textbf{Remark:} We strictly only need uniform convergence on compact subsets of $U$.

\vspace{1em}
\textbf{Cauchy's Estimate}

\textbf{Theorem:} Let $f \in \mathcal{H}(B(a,r))$, and suppose $|f(z)| \le M$ for all $z \in B(a,r)$. Then for any $k \ge 0$:
$$ |f^{(k)}(a)| \le \frac{k! M}{r^k} $$

\textit{Proof:}
Let $0 < \rho < r$. By the Cauchy Integral Formula for derivatives:
$$ f^{(k)}(a) = \frac{k!}{2\pi i} \int_{a+\gamma_\rho} \frac{f(z)}{(z-a)^{k+1}} dz $$
Using the ML inequality, where the length of the curve $a+\gamma_\rho$ is $2\pi\rho$, and $|z-a| = \rho$ on the curve:
$$ |f^{(k)}(a)| \le \frac{k!}{2\pi} \max_{z \in a+\gamma_\rho} \left| \frac{f(z)}{(z-a)^{k+1}} \right| \cdot 2\pi\rho $$
$$ \le \frac{k!}{2\pi} \frac{M}{\rho^{k+1}} \cdot 2\pi\rho = \frac{k! M}{\rho^k} $$
Since this inequality holds for any $\rho < r$, taking the limit as $\rho \to r$ gives:
$$ |f^{(k)}(a)| \le \frac{k! M}{r^k} $$

\vspace{1em}
\textbf{Properties of Holomorphic Functions}

\textbf{Liouville's Theorem:}
A bounded entire function is constant.
(Again, this is NOT true in $\mathbb{R}$, e.g., $\sin x$).

\textit{Proof:}
Let $f$ be an entire function (holomorphic on all of $\mathbb{C}$).
Let $a \in \mathbb{C}$. Since $f$ is entire, we can write a power series expansion of $f$ around $a$:
$$ f(z) = \sum_{k \ge 0} a_k (z-a)^k $$
which is valid on the whole of $\mathbb{C}$. The coefficients are given by $a_k = \frac{f^{(k)}(a)}{k!}$.
We want to show that $a_k = 0$ for all $k \ge 1$.
If $a_k = 0$ for $k \ge 1$, then $f(z) = a_0 = f(a)$, meaning $f$ is constant.
Since $f$ is bounded, there exists $M > 0$ such that $|f(z)| \le M$ for all $z \in \mathbb{C}$.
By Cauchy's Estimate on a ball of radius $R$:
$$ |a_k| = \frac{|f^{(k)}(a)|}{k!} \le \frac{M}{R^k} $$
Since $f$ is entire, this is true for any $R > 0$.
As $R \to \infty$, for any $k \ge 1$, the term $\frac{M}{R^k} \to 0$.
Therefore, $|a_k| \le 0 \implies a_k = 0$ for all $k \ge 1$.
Hence, $f$ is constant.

\textbf{Alternative Proof (using $k=1$):}
For $k=1$, Cauchy's estimate gives $|f'(z_0)| \le \frac{M}{R}$. As $R \to \infty$, $|f'(z_0)| \to 0 \implies f'(z_0) = 0$ for all $z_0$. Since the derivative is zero everywhere, $f$ is constant.

\textbf{Corollary:} The complex cosine and sine functions are NOT bounded (otherwise they would be constant by Liouville's theorem, which they aren't).

\vspace{1em}
\textbf{Generalised Liouville's Theorem}

Let $f$ be an entire function such that there exist constants $A, B > 0$ with:
$$ |f(z)| \le A + B|z|^n $$
for some positive integer $n$ and all $z \in \mathbb{C}$. Then $f$ must be a polynomial of degree at most $n$.

\textit{Proof:}
As before, write the power series expansion of $f$ around $0$:
$$ f(z) = \sum_{k \ge 0} b_k z^k $$
valid on $\mathbb{C}$.
The coefficients are $b_k = \frac{f^{(k)}(0)}{k!}$.
We want to show that $b_k = 0$ for all $k > n$.
On a ball $B(0, r)$, the bound of $f$ is $M_r \le A + B r^n$.
By Cauchy's Estimate:
$$ |b_k| \le \frac{M_r}{r^k} \le \frac{A + B r^n}{r^k} $$
For $k > n$, as $r \to \infty$:
$$ \frac{A + B r^n}{r^k} = \frac{A}{r^k} + \frac{B}{r^{k-n}} \to 0 + 0 = 0 $$
Thus, $b_k = 0$ for all $k > n$. Therefore, $f(z) = b_0 + b_1 z + \dots + b_n z^n$, which is a polynomial of degree at most $n$.

\vspace{1em}
\textbf{Fundamental Theorem of Algebra}

\textbf{Theorem:} Let $P(z)$ be a non-constant polynomial of degree $n$. Then $P$ has exactly $n$ zeros in $\mathbb{C}$, counting multiplicity.
This means $\mathbb{C}$ is algebraically closed.

\textit{Proof:}
It is equivalent to proving that $P$ has at least one zero in $\mathbb{C}$.
Proof by contradiction: Suppose $P(z) \neq 0$ for all $z \in \mathbb{C}$.
Define $F(z) = \frac{1}{P(z)}$. Since the denominator is never zero and $P$ is entire, $F$ is an entire function.
Since $P(z)$ is a non-constant polynomial, as $|z| \to \infty$, $|P(z)| \to \infty$.
Therefore, $\lim_{|z| \to \infty} |F(z)| = \lim_{|z| \to \infty} \frac{1}{|P(z)|} = 0$.
This implies there exists an $R > 0$ such that for all $|z| > R$, we have $|F(z)| \le 1$.
On the closed disk $|z| \le R$, which is a compact set, the continuous function $|F(z)|$ attains a maximum, say $M$.
Thus, for all $z \in \mathbb{C}$, $|F(z)| \le \max(M, 1)$, meaning $F$ is a bounded entire function.
By Liouville's theorem, $F$ must be a constant.
If $F$ is constant, then $P(z) = \frac{1}{F(z)}$ is also constant.
But we assumed $P(z)$ is a non-constant polynomial. This is a contradiction.
Hence, $P$ must have at least one zero in $\mathbb{C}$.

\textbf{Theorem:} Let $f$ be an entire function such that $|f(z)| \to \infty$ as $|z| \to \infty$. Then $f$ must be a polynomial.

\textbf{Corollary:} Let $f$ be an entire function that is non-constant and NOT a polynomial. Then $\lim_{|z| \to \infty} |f(z)|$ does not exist.
For example, for $f(z) = e^z$, let $z = x+iy$. Then $|e^z| = e^x$.
If $x \to \infty$ along the real axis, $|e^z| \to \infty$.
If $x \to -\infty$ along the real axis, $|e^z| \to 0$.
Because the limits are different in different directions as $|z| \to \infty$, the overall limit does not exist.

\textbf{Lemma:} Let $D$ be a domain and $f \in \mathcal{H}(D)$ such that $f$ is not identically $0$ (i.e., $f \not\equiv 0$). Then $f$ has only finitely many zeros in any compact subset $K$ of $D$.

(Note: This is NOT true in $\mathbb{R}$. For example, the function
$$f(x) = \begin{cases} e^{-1/x} & x > 0 \\ 0 & x \le 0 \end{cases}$$
has infinitely many zeros).

\textit{Proof of Theorem:}
Since $f$ is entire and $|f(z)| \to \infty$ as $|z| \to \infty$, there exists $R > 0$ such that if $|z| \ge R$, then $|f(z)| \ge 1$.
Hence, the only possible zeros of $f$ lie in the compact set $\overline{B(0, R)}$. By the lemma above, $f$ has only finitely many zeros.

Let $\alpha_1, \alpha_2, \dots, \alpha_n$ be all the zeros of $f$ (which need not be distinct).
Consider the function:
$$g(z) = \frac{f(z)}{(z-\alpha_1)(z-\alpha_2)\dots(z-\alpha_n)}$$
Note that $g$ is holomorphic everywhere except possibly at the $\alpha_i$'s.
Around $\alpha_1$:
$$\frac{f(z)-f(\alpha_1)}{z-\alpha_1} = \frac{f(z)}{z-\alpha_1}$$
(since $f(\alpha_1) = 0$).

Suppose $\alpha_1 = \alpha_2$. Then:
$$g_1(z) = \frac{1}{z-\alpha_2} \frac{f(z)-f(\alpha_1)}{z-\alpha_1} = \frac{f(z)}{(z-\alpha_1)^2}$$
This is the product of two holomorphic functions at $\alpha_1$.
Thus, $g$ is an entire function and $g$ has no zeros in $\mathbb{C}$.

Let $h(z) = \frac{1}{g(z)}$. Since $g$ is entire and non-vanishing, $h$ is also entire.
For $|z| \ge R$:
$$|h(z)| = \frac{|(z-\alpha_1)\dots(z-\alpha_n)|}{|f(z)|} \le \frac{c|z|^n}{1}$$
For $|z| \le R$, since $h$ is continuous on a compact set, it is bounded, so $|h(z)| \le M$.
Combining these, we get:
$$|h(z)| \le M + c|z|^n \quad \forall z \in \mathbb{C}$$

\vspace{1em}
This implies $h$ is a polynomial of degree at most $n$.
However, since $h$ is non-vanishing, $h$ must be a constant.
This implies $g$ is also a constant. Therefore:
$$f(z) = \text{const} \cdot (z-\alpha_1)(z-\alpha_2)\dots(z-\alpha_n)$$

\vspace{1em}
\textbf{Multiplicity}

Examples of zeros:
1. $f(x) = |x|$ has a zero at $0$.
2. $f(x) = \sqrt{x}$ on $[0, \infty)$ has a zero at $0$.
3. $f(x) = \begin{cases} e^{-1/x} & x > 0 \\ 0 & x \le 0 \end{cases}$ has a zero at $0$.

\textbf{Order at a point:}
Let $f \in \mathcal{H}(B(a,r))$ have the power series expansion:
$$f(z) = \sum_{k \ge 0} a_k (z-a)^k$$
The least $k \ge 0$ such that $a_k \neq 0$ is called the order of $f$ at $a$.

\vspace{1em}
\noindent \textbf{16-April}

\textbf{Identity Theorem / Uniqueness Theorem}

\textbf{Theorem:} Let $D$ be a domain and $f \in \mathcal{H}(D)$. Suppose there exists a sequence $\{z_n\} \in D$ of distinct points such that $z_n \to z_0 \in D$ and $f(z_n) = 0$. Then $f \equiv 0$ on $D$.

(Note: This is not true in $\mathbb{R}$. For instance, $f(x) = 0$ if $x \le 0$ and $e^{-1/x}$ if $x > 0$. The zeros accumulate at $0$, but the function is not identically $0$).

\textbf{Corollary:} Let $D$ be a domain and $f, g \in \mathcal{H}(D)$. Suppose there exists a sequence $\{z_n\} \in D$ of distinct points such that $z_n \to z_0 \in D$ and $f(z_n) = g(z_n)$. Then $f \equiv g$ on $D$.
(For example, going from the real identity $\cos^2 x + \sin^2 x = 1$ in $\mathbb{R}$ to the complex identity $\cos^2 z + \sin^2 z = 1$ in $\mathbb{C}$ is a direct application of the identity theorem).

\textit{Proof:}
Given $z_n \to z_0$, by continuity we have $f(z_n) \to f(z_0) = 0$.
We first show that $f$ is identically $0$ in a neighborhood of $z_0$.
We do this by showing all higher derivatives of $f$ at $z_0$ are $0$.
Expanding $f$ around $z_0$:
$$f(z) = f(z_0) + (z-z_0)f'(z_0) + \frac{(z-z_0)^2}{2!} f''(z_0) + \dots$$

\vspace{1em}
Define a new function:
$$g_1(z) = \begin{cases} \frac{f(z)}{z-z_0} & z \neq z_0 \\ f'(z_0) & z = z_0 \end{cases}$$
Since $f$ is holomorphic, $g_1 \in \mathcal{H}(D)$.
Evaluating $g_1$ at the sequence $z_n$:
$g_1(z_n) = 0$ for all but finitely many $n$ (because $z_n \neq z_0$ and $f(z_n) = 0$).
By continuity, $g_1(z_0) = 0$, which means $f'(z_0) = 0$.

Next, define:
$$g_2(z) = \begin{cases} \frac{f(z)}{(z-z_0)^2} & \text{for } z \neq z_0 \\ \frac{f''(z_0)}{2!} & \text{for } z = z_0 \end{cases}$$
This implies $g_2 \in \mathcal{H}(D)$.
Again, $g_2(z_n) = 0$ for all but finitely many $n$.
This means $g_2(z_0) = 0$, which implies $f''(z_0) = 0$.
Continuing this process by induction, we can show that all derivatives of $f$ at $z_0$ are zero.

Now, let $A = \{z \in D \mid f \text{ is identically } 0 \text{ in a neighborhood of } z\}$.
Let $B = D \setminus A$.
We know $A \neq \emptyset$ because $z_0 \in A$.
Thus, $D = A \sqcup B$.
We will show that both $A$ and $B$ are open sets. Since $A \neq \emptyset$ and $D$ is a connected set, this will force $A = D$.

To prove $A$ is open:
Let $w \in A$. This implies there exists $\delta > 0$ such that $f = 0$ on $B(w, \delta)$.
Thus, $B(w, \delta) \subseteq A$.
For any $z \in B(w, \delta)$, there exists a $\delta'$ such that $B(z, \delta') \subseteq B(w, \delta)$.
Hence, $A$ is open.

Next, to prove $B$ is open:
i) If $B = \emptyset$, it is trivially open.
ii) Let $z \in B$. By the definition of $B$, there does not exist any sequence of zeros of $f$ that converge to $z$ (otherwise, by our earlier proof, $z$ would belong to $A$).
This implies there exists $\delta > 0$ such that $f$ does not vanish on the punctured disk $B(z, \delta) \setminus \{z\}$.
Take any $w \in B(z, \delta) \setminus \{z\}$. There exists a neighborhood $B(w, \delta') \subseteq B(z, \delta) \setminus \{z\}$ where $f$ does not vanish, meaning $w \in B$.
Therefore, $B(z, \delta) \setminus \{z\} \subseteq B$.
Hence, $B$ is open.

\vspace{1em}
\textbf{Integral Domain Property}

In $\mathbb{C}$, if $a \cdot b = 0$, then at least one of them is $0$.

\textbf{Corollary:} Let $D$ be a domain (an open and connected set). Let $f,g \in \mathcal{H}(D)$ such that $f \cdot g \equiv 0$ on $D$. Then either $f \equiv 0$ or $g \equiv 0$ on $D$.

\textit{Proof:} Since $f \cdot g \equiv 0$ on $D$, at least one of them vanishes at infinitely many points in some closed ball $B[a,r] \subseteq D$. Say it is $f$. Then $f \equiv 0$ on $B[a,r]$. By the Identity Theorem, since $f$ is zero on a set with a limit point, $f \equiv 0$ on the entire domain $D$.

\textbf{Example:} $\sin z$ has infinitely many zeros in $\mathbb{C}$, but $\sin z$ is NOT identically $0$.

\vspace{1em}
\textbf{Maximum Modulus Principle}

\textbf{Statement 1:} Let $D$ be a domain, and $f \in \mathcal{H}(D)$ such that $f$ is non-constant. Then for every $z_0 \in D$ and any $\delta > 0$, there exists $w \in B(z_0, \delta) \cap D$ such that $|f(w)| > |f(z_0)|$.
(Note: This is NOT true in $\mathbb{R}$. For example, $f(x) = \sin x$ on $(0, \pi)$ has a local maximum at $\pi/2$).

\textbf{Statement 2:} Let $D$ be a domain and $f \in \mathcal{H}(D)$. Let $a \in D$ be such that $|f(a)| \ge |f(z)|$ for all $z \in D$. Then $f$ is constant.

Statement 1 and Statement 2 are equivalent.
Suppose Statement 1 is not true. Then there exists $z_0 \in D$ and $\delta > 0$ such that $|f(w)| \le |f(z_0)|$ for all $w \in B(z_0, \delta)$. This implies $|f|$ has a local maximum, making $f$ constant on $B(z_0, \delta)$, and by the Identity Theorem, $f$ is constant on $D$ (a contradiction to $f$ being non-constant).

\vspace{1em}
\noindent \textbf{17-April}

\textit{Proof of Statement 1:}
There exists $\epsilon > 0$ such that $B(z_0, \epsilon) \subseteq D$. We prove the statement for any $0 < \delta < \epsilon$.
By the Cauchy Integral Formula, for any $0 < \delta' < \delta$:
$$ f(z_0) = \frac{1}{2\pi i} \int_{|z-z_0|=\delta'} \frac{f(z)}{z-z_0} dz = \frac{1}{2\pi i} \int_0^{2\pi} \frac{f(z_0 + \delta' e^{i\theta})}{\delta' e^{i\theta}} (\delta' i e^{i\theta}) d\theta = \frac{1}{2\pi} \int_0^{2\pi} f(z_0 + \delta' e^{i\theta}) d\theta $$

Now suppose, for the sake of contradiction, that $|f(w)| \le |f(z_0)|$ for all $w \in B(z_0, \delta)$.
Taking the absolute value of both sides:
$$ |f(z_0)| = \left| \frac{1}{2\pi} \int_0^{2\pi} f(z_0 + \delta' e^{i\theta}) d\theta \right| \le \frac{1}{2\pi} \int_0^{2\pi} |f(z_0 + \delta' e^{i\theta})| d\theta $$
Since we assumed $|f(z_0 + \delta' e^{i\theta})| \le |f(z_0)|$:
$$ \frac{1}{2\pi} \int_0^{2\pi} |f(z_0 + \delta' e^{i\theta})| d\theta \le \frac{1}{2\pi} \int_0^{2\pi} |f(z_0)| d\theta = |f(z_0)| $$
This implies that the inequality must actually be an equality:
$$ |f(z_0)| = \frac{1}{2\pi} \int_0^{2\pi} |f(z_0 + \delta' e^{i\theta})| d\theta \implies \frac{1}{2\pi} \int_0^{2\pi} \left[ |f(z_0)| - |f(z_0 + \delta' e^{i\theta})| \right] d\theta = 0 $$
Since the integrand is non-negative and continuous, it must be zero everywhere:
$$ |f(z_0)| = |f(z_0 + \delta' e^{i\theta})| \quad \forall \theta \in [0, 2\pi] $$
Thus, $|f|$ is constant on $B(z_0, \delta)$. By the Cauchy-Riemann equations (as proven earlier), if the modulus of a holomorphic function is constant, the function itself is constant on $B(z_0, \delta)$. By the Identity Theorem, $f$ is constant on $D$ (since $D$ is connected). This is a contradiction.

\textbf{Corollary:} Let $U$ be a bounded open subset of $\mathbb{C}$. Let $f$ be continuous on $\overline{U}$ and $f \in \mathcal{H}(U)$. Then $\max \{|f(z)| \mid z \in \overline{U}\}$ is attained on the boundary $\partial U$.

\textit{Proof:} Since $\overline{U}$ is closed and bounded, it is compact. The continuous function $|f|$ must attain its maximum on $\overline{U}$.
If $f$ is constant, there is nothing to prove (the maximum is attained everywhere, including the boundary).
Let $f$ be non-constant. Suppose the maximum is attained at an interior point $a \in U$, meaning $|f(a)| \ge |f(z)|$ for all $z \in \overline{U}$.
By the Maximum Modulus Principle, there must exist $w \in U$ such that $|f(w)| > |f(a)|$. This contradicts the assumption that $a$ is the global maximum. Therefore, the maximum cannot be in the interior and must be attained on the boundary $\partial U$.

\textbf{Remark:} Dropping connectedness leads to considering connected components. For any point $a \in D$, the connected component of $D$ containing $a$ is the largest connected set containing $a$.

\textbf{Remark:} Boundedness of $U$ is important. Consider $U = \{z \in \mathbb{C} \mid \text{Re}(z) > 0\}$ and $f(z) = e^z$. The boundary is $\partial U = \{iy \mid y \in \mathbb{R}\}$. On the boundary, $|f(iy)| = |e^{iy}| = 1$. However, inside $U$, as $z = x \to \infty$, $|e^x| \to \infty$. The maximum is not attained on the boundary because $U$ is unbounded.

\vspace{1em}
\textbf{Minimum Modulus Principle}

\textbf{Theorem:} Let $D$ be a domain and $f \in \mathcal{H}(D)$ be non-constant. Then $|f|$ has no local minimum $z_0$ in $D$ unless $f(z_0) = 0$.

\textit{Proof:} Suppose $f(z_0) \neq 0$ and $z_0$ is a local minimum, meaning there exists $\epsilon > 0$ such that $|f(z_0)| \le |f(w)|$ for all $w \in B(z_0, \epsilon) \subset D$.
Since $f(z_0) \neq 0$ and $f$ is continuous, we can choose $\epsilon$ small enough such that $f$ does not vanish on $B(z_0, \epsilon)$.
Consider the function $g = 1/f$ defined on $B(z_0, \epsilon)$. $g$ is holomorphic there.
Since $z_0$ is a local minimum for $|f|$, it acts as a local maximum for $|g| = 1/|f|$.
Applying the Maximum Modulus Principle to $g$ on $B(z_0, \epsilon)$, we conclude that $g$ must be constant. If $g$ is constant, then $f$ is constant, which contradicts the assumption that $f$ is non-constant.
Hence, if $z_0$ is a local minimum, we must have $f(z_0) = 0$.

\textbf{Corollary:} Let $U$ be a bounded open subset of $\mathbb{C}$. Let $f$ be continuous on $\overline{U}$ such that $f \in \mathcal{H}(U)$, and $f$ is non-constant. Then either $f$ has a zero in $U$, or $|f|$ attains its minimum on the boundary $\partial U$.

\textbf{Remark:} The Maximum and Minimum Modulus Principles do not hold for real differentiable functions. For instance, $f(x) = x^2 + 1$ on $[-1, 1]$ attains its minimum at $x=0$ (in the interior) and does not have a zero. Similarly, $\sin x$ on $\mathbb{R}$ maps to $[-1, 1]$, and its extrema are inside the domain.

\vspace{1em}
\textbf{Open Mapping Theorem}

\textbf{Open Mapping Theorem}

\textbf{Theorem:} Let $D$ be a domain, and $f \in \mathcal{H}(D)$ be a non-constant function. Then for any open subset $U \subseteq D$, the image $f(U)$ is open in $\mathbb{C}$.

\textbf{Corollary:} We cannot have a non-constant entire function $f: \mathbb{C} \to \mathbb{R}$, because $\mathbb{R}$ is not an open set in $\mathbb{C}$.

\textit{Proof:}
We need to show that if $U$ is open, then $f(U)$ is open.
Let $f(\alpha) \in f(U)$ where $\alpha \in U$. We need to find an open set containing $f(\alpha)$ that lies entirely inside $f(U)$.
Without loss of generality, we can assume $f(\alpha) = 0$ by working with the function $g(z) = f(z) - f(\alpha)$.

Since $U$ is open, there exists $r > 0$ such that the closed ball $\overline{B(\alpha, r)} \subseteq U$.
Because $f$ is non-constant, its zeros are isolated. Thus, there exists a $\delta > 0$ (with $\delta < r$) such that $f$ does not vanish on the circle $\alpha + \gamma_\delta$ centered at $\alpha$ with radius $\delta$.
Since the circle $\alpha + \gamma_\delta$ is a compact set, $|f(z)|$ attains a minimum on it.
Let $\epsilon = \min_{z \in \alpha+\gamma_\delta} |f(z)|$. We know $\epsilon > 0$.

\textbf{Claim:} $B(f(\alpha), \epsilon/2) \subseteq f(U)$.
Let $w \in B(f(\alpha), \epsilon/2) = B(0, \epsilon/2)$, meaning $|w| < \epsilon/2$.
For any $z$ on the boundary $\alpha + \gamma_\delta$, we have by the triangle inequality:
$$ |f(z)-w| \ge |f(z)| - |w| $$
Since $|f(z)| \ge \epsilon$ and $|w| < \epsilon/2$, we get:
$$ |f(z)-w| > \epsilon - \frac{\epsilon}{2} = \frac{\epsilon}{2} > |w| = |f(\alpha) - w| $$

Now consider the function $h(z) = f(z) - w$ on the closed disk $\overline{B(\alpha, \delta)}$.
The inequality $|h(z)| > |h(\alpha)|$ for all $z$ on the boundary $\partial B(\alpha, \delta) = \alpha + \gamma_\delta$ shows that $|h|$ does not attain its minimum on the boundary.
By the Minimum Modulus Principle, the minimum must be attained in the interior, and this minimum value must be $0$.
Thus, $h$ has a zero in $B(\alpha, \delta)$, meaning there exists some $z' \in B(\alpha, \delta)$ such that $h(z') = f(z') - w = 0 \implies f(z') = w$.
Since $B(\alpha, \delta) \subseteq U$, we have found that $w \in f(U)$.
Therefore, $B(f(\alpha), \epsilon/2) \subseteq f(B(\alpha, \delta)) \subseteq f(U)$, proving that $f(U)$ is open.

\vspace{1em}
\noindent \textbf{18-April}

\textbf{Inverse Function Theorem}

\textit{Over $\mathbb{R}$:} If $f$ is a continuously differentiable function with a non-zero derivative at a point $a$, then $f$ is invertible in a neighborhood of $a$. The inverse of $f$ is continuously differentiable, and the derivative of $f^{-1}$ at $b = f(a)$ is given by:
$$ (f^{-1})'(b) = \frac{1}{f'(a)} $$
\textbf{Remark:} Non-vanishing of derivative is not a necessary condition for injectivity on $\mathbb{R}$. For example, $f(x) = x^3$ is injective on $\mathbb{R}$, but its derivative at $0$ is $0$.

\textbf{Inverse Function Theorem for Holomorphic Functions:}
Let $V$ be a domain, and $f \in \mathcal{H}(V)$. Suppose $f$ is injective. Denote $W = f(V)$. Then $f^{-1}: W \to V$ is holomorphic, and:
$$ (f^{-1})'(w) = \frac{1}{f'(z)} \quad \text{where } w = f(z) $$

\textit{Recall Theorem:} Let $U, V$ be open subsets of $\mathbb{C}$. Let $g_1: U \to V$ and $g_2: V \to U$ be continuous functions such that $g_2(g_1(z)) = z$ for all $z \in U$. If $g_2$ is differentiable and $g_2'$ does not vanish, then $g_1$ is differentiable on $U$ and $g_1'(z) = \frac{1}{g_2'(g_1(z))}$.

Applying this to $f$ and $f^{-1}$:
1. $f$ is holomorphic (and thus continuous).
2. We need to show $f^{-1}$ is continuous. For any open set $X \subseteq V$, the preimage under $f^{-1}$ is $(f^{-1})^{-1}(X) = f(X)$. By the Open Mapping Theorem, since $f$ is holomorphic and non-constant (injective implies non-constant), $f(X)$ is open. Hence, $f^{-1}$ is continuous.
3. We need to prove that $f'$ does not vanish anywhere in $V$.

\textbf{Non-vanishing of the derivative (Proof by Contradiction):}
Suppose $f'(a) = 0$ for some $a \in V$.
Write the power series expansion of $f$ around $a$:
$$ f(z) = \sum_{n=0}^{\infty} a_n(z-a)^n = a_0 + a_1(z-a) + a_2(z-a)^2 + \dots $$
Since $f'(a) = 0$, we have $a_1 = 0$.
Let $k \ge 2$ be the smallest integer such that $a_k \neq 0$ (so $a_n = 0$ for $1 \le n < k$).
Then:
$$ f(z) = a_0 + a_k(z-a)^k + \sum_{n > k} a_n(z-a)^n = a_0 + (z-a)^k \left[ a_k + \sum_{n > k} a_n(z-a)^{n-k} \right] $$
$$ = a_0 + (z-a)^k g(z) $$
where $g(z)$ is holomorphic at $a$ and $g(a) = a_k \neq 0$.
By continuity, there exists a neighborhood $B(a, \epsilon)$ on which $g$ is non-vanishing.
This allows us to define a holomorphic branch of the logarithm for $g$ on $B(a, \epsilon)$, and consequently, we can define a holomorphic $k$-th root function:
$$ h(z) = \exp\left(\frac{1}{k} \log g(z)\right) $$
such that $(h(z))^k = g(z)$. Since $g(a) \neq 0$, $h(a) \neq 0$.
Now we can write:
$$ f(z) = a_0 + [(z-a)h(z)]^k $$
Let $\phi(z) = (z-a)h(z)$. Note that $\phi(a) = 0$ and $\phi'(a) = h(a) \neq 0$.
By the Open Mapping Theorem (or the Inverse Function Theorem since $\phi'(a) \neq 0$), the image of a small neighborhood of $a$ under $\phi$ contains an open disk centered at $\phi(a) = 0$.
Choose $w \neq 0$ small enough such that $w$ is in this image.
Since $w \neq 0$, the equation $\zeta^k = w^k$ has $k$ distinct roots. Let $w_1, w_2$ be two distinct $k$-th roots of $w^k$.
Because these are in the image of $\phi$, there exist $z_1, z_2$ near $a$ such that $\phi(z_1) = w_1$ and $\phi(z_2) = w_2$.
Since $w_1 \neq w_2$, we must have $z_1 \neq z_2$.
However,
$$ f(z_1) = a_0 + (\phi(z_1))^k = a_0 + w_1^k = a_0 + w^k $$
$$ f(z_2) = a_0 + (\phi(z_2))^k = a_0 + w_2^k = a_0 + w^k $$
Thus, $f(z_1) = f(z_2)$ for $z_1 \neq z_2$, which contradicts the assumption that $f$ is injective.
Therefore, $f'(z)$ can never vanish if $f$ is injective.

\vspace{1em}
\textbf{Exercise:} Prove that non-vanishing of derivative implies injectivity over $\mathbb{C}$ locally.

\vspace{1em}
\noindent \textbf{21-April}

\textbf{Singularities}

Singularities are points where we don't have holomorphicity.

\textbf{Isolated Singularities:}
A function $f$ has an isolated singularity at $\alpha \in \mathbb{C}$ if there exists $r > 0$ such that $f$ is holomorphic on $B(\alpha, r) \setminus \{\alpha\}$, but $f$ is NOT holomorphic at $\alpha$.

Why isolated?
Non-isolated singularities occur when we cannot make the function holomorphic in any punctured neighborhood around $\alpha$. The set of "problematic" points have a limit point.
For example, $\log z$ around $0$, or $\tan(1/z)$ at $z=0$ (limit of zeros). For a fixed $n$, as $z_n \to 0$, $|\tan(1/z_n)| \to \infty$.

\textbf{Types of Singularities}

1. \textbf{Removable Singularity:}
An isolated singularity $\alpha$ of $f$ is called a removable singularity of $f$ if there exists a function $g$ which is holomorphic in a neighborhood $B(\alpha, r)$ of $\alpha$ and agrees with $f$ on $B(\alpha, r) \setminus \{\alpha\}$.
If we define $f(\alpha) = g(\alpha)$, then $f$ becomes holomorphic at $\alpha$. Basically, we are assigning the limit at that point, if it exists.

For example:
$$ f(z) = \begin{cases} \frac{\sin z}{z} & z \neq 0 \\ 35 & z = 0 \end{cases} $$
This function is not holomorphic at $z=0$ (has a singularity at $z=0$).
But $\lim_{z \to 0} \frac{\sin z}{z} = 1$. So a holomorphic function exists around $0$ if we redefine the value at $0$ to be $1$.

2. \textbf{Polar Singularity:}
An isolated singularity $\alpha$ of $f$ is said to be a polar singularity of $f$ (or a pole of $f$) if in a deleted neighborhood $B(\alpha, \delta) \setminus \{\alpha\}$ we have:
$$ f(z) = \frac{g(z)}{h(z)} $$
where $g(\alpha) \neq 0$, $h(\alpha) = 0$, and $g, h \in \mathcal{H}(B(\alpha, \delta))$.
For example, $f(z) = 1/z$. The limit does not exist.

3. \textbf{Essential Singularity:}
An isolated singularity $\alpha$ of $f$ is said to be an essential singularity if $\alpha$ is neither a removable nor a polar singularity.
For example, $\exp(1/z)$ has an essential singularity at $z=0$.

\vspace{1em}
\textbf{Theorem:} Let $\alpha$ be an isolated singularity of $f$. Then $\alpha$ is removable if and only if:
$$ \lim_{z \to \alpha} (z-\alpha)f(z) = 0 $$

\textit{Proof:}
The forward direction ($\implies$) is immediate.
For the reverse direction ($\impliedby$), suppose $\lim_{z \to \alpha} (z-\alpha)f(z) = 0$.
Define:
$$ h(z) = \begin{cases} (z-\alpha)f(z) & z \neq \alpha \\ 0 & z = \alpha \end{cases} $$
We check if $h$ is holomorphic around $\alpha$:
$$ h'(\alpha) = \lim_{z \to \alpha} \frac{h(z)-h(\alpha)}{z-\alpha} = \lim_{z \to \alpha} \frac{(z-\alpha)f(z)}{z-\alpha} = \lim_{z \to \alpha} f(z) $$
(The proof continues by defining a function $g(z)$ which serves as the required extension of $f$, proving $\alpha$ is a removable singularity).

\textbf{Theorem:} Let $\alpha$ be an isolated singularity. $\alpha$ is a polar singularity of $f$ if and only if $\lim_{z \to \alpha} |f(z)| = \infty$.
(The forward direction $\implies$ is immediate as with $f(z) = \frac{g(z)}{h(z)}$).

\textbf{Essential Singularity Characterization:}
$\alpha$ is an essential singularity if and only if there exist two sequences $\{a_n\}$ and $\{b_n\}$ such that $a_n \to \alpha$ ($a_n \neq \alpha$) and $b_n \to \alpha$ ($b_n \neq \alpha$) as $n \to \infty$, such that:
- $f(a_n)$ is bounded (e.g., converges to some $c$)
- $f(b_n) \to \infty$ (or converges to a different limit $d \neq c$)

For example, $f(z) = \exp(1/z)$ has an essential singularity at $0$.
Take $z_n = 1/n \implies f(z_n) \to \infty$.
Take $z_n = -1/n \implies f(z_n) \to 0$.
Take $z_n = i/n \implies$ oscillates.

\textbf{Exercise:} Show that $\sin(1/z)$ and $\cos(1/z)$ have essential singularities at $0$.

\vspace{1em}
\noindent \textbf{22-April}

\textbf{Continuing the proof:} ($\lim_{z \to \alpha} |f(z)| = \infty \implies$ polar singularity)

Let $\lim_{z \to \alpha} |f(z)| = \infty$.
Then there exists $r > 0$ such that on $B(\alpha, r) \setminus \{\alpha\}$, $|f(z)| > 10^{2026}$ (or any large bound).
Define $h(z) = \frac{1}{f(z)}$ for $z \in B(\alpha, r) \setminus \{\alpha\}$.
$h$ is holomorphic on $B(\alpha, r) \setminus \{\alpha\}$.
Also, $\lim_{z \to \alpha} h(z) = 0$.
Thus, $h$ can be made holomorphic at $\alpha$ by setting $h(\alpha) = 0$.
Since $h$ is not identically zero, there is some integer $m \ge 1$ such that $h(\alpha) = 0, h'(\alpha) = 0, \dots, h^{(m-1)}(\alpha) = 0$, but $h^{(m)}(\alpha) \neq 0$.

Hence, we can write the Taylor expansion of $h$ around $\alpha$:
$$ h(z) = (z-\alpha)^m \sum_{n \ge m} a_n(z-\alpha)^{n-m} = (z-\alpha)^m h_1(z) $$
Note that $h_1$ is holomorphic on $B(\alpha, r)$ and $h_1(\alpha) = a_m \neq 0$.
This implies there exists $\delta > 0$ such that $h_1(z) \neq 0$ on $B(\alpha, \delta)$.
Therefore, $1/h_1(z)$ is holomorphic on $B(\alpha, \delta)$.

So, in $B(\alpha, \delta) \setminus \{\alpha\}$:
$$ f(z) = \frac{1}{h(z)} = \frac{1}{(z-\alpha)^m h_1(z)} = \frac{1/h_1(z)}{(z-\alpha)^m} $$
This matches the definition of a pole, where the numerator $1/h_1(z)$ is holomorphic and non-zero at $\alpha$. Thus, $\alpha$ is a polar singularity.

\textbf{Remark:} The proof shows that if $\alpha$ is a pole of $f$, then around $\alpha$ we can write:
$$ f(z) = \frac{g(z)}{(z-\alpha)^m} $$
for some integer $m > 0$ such that $g(\alpha) \neq 0$ and $g$ is holomorphic at $\alpha$.
In this case, we say that $\alpha$ is a pole of "order $m$".

\vspace{1em}
\textbf{Essential Singularity Characterization}

$\alpha$ is an essential singularity of $f$ if and only if there exist two sequences $\{a_n\}$ and $\{b_n\}$ such that $a_n \to \alpha$ ($a_n \neq \alpha$) and $b_n \to \alpha$ ($b_n \neq \alpha$) as $n \to \infty$, such that:
\begin{itemize}
    \item $f(a_n)$ is bounded, and $|f(b_n)| \to \infty$
    \item OR $f(a_n) \to c$ and $f(b_n) \to d$ where $c \neq d$ as $n \to \infty$.
\end{itemize}

\textbf{Casorati-Weierstrass Theorem:}
Let $\alpha$ be an essential singularity of $f$. Then for any $\delta > 0$, the image $f(B(\alpha, \delta) \setminus \{\alpha\})$ is dense in $\mathbb{C}$.
(A stronger theorem than Casorati-Weierstrass is \textbf{Great Picard's Theorem}: $f(B(\alpha, r) \setminus \{\alpha\}) = \mathbb{C} \text{ or } \mathbb{C} \setminus \{a\}$).

\textit{Proof of Casorati-Weierstrass:}
To show that $f(B(\alpha, r) \setminus \{\alpha\})$ is dense, it is equivalent to proving that $f(B(\alpha, r) \setminus \{\alpha\})$ intersects any open set, which means it intersects any open disk $B(a, \delta)$.
Proof by contradiction: Suppose $f(B(\alpha, r) \setminus \{\alpha\}) \cap B(a, \delta) = \emptyset$.
$$ \implies \text{on } B(\alpha, r) \setminus \{\alpha\}, \quad |f(z) - a| > \delta > 0 $$
Define:
$$ g(z) = \frac{1}{f(z)-a} $$
This function is holomorphic on $B(\alpha, r) \setminus \{\alpha\}$.
Note that $|g(z)| \le 1/\delta$ for all $z \in B(\alpha, r) \setminus \{\alpha\}$.
Since $g$ is bounded in a punctured neighborhood of $\alpha$, $g$ has a removable singularity at $\alpha$.
We can write $f(z) - a = \frac{1}{g(z)}$ on $B(\alpha, r) \setminus \{\alpha\}$.
If $g(\alpha) \neq 0$, then $1/g$ is holomorphic at $\alpha$, so $\alpha$ is a removable singularity of $f$.
If $g(\alpha) = 0$, then $1/g$ has a pole, so $\alpha$ is a polar singularity of $f$.
In either case, $\alpha$ is NOT an essential singularity. This is a contradiction!
Hence, $f(B(\alpha, r) \setminus \{\alpha\}) \cap B(a, \delta) \neq \emptyset$.

\vspace{1em}
\textbf{Summary of Singularity Expansions:}
\begin{itemize}
    \item Let $\alpha$ be a removable singularity of $f$. In principle, $f(z) = \sum_{n \ge 0} a_n(z-\alpha)^n$.
    \item Let $\alpha$ be a polar singularity. $f(z) = \frac{g(z)}{(z-\alpha)^m}$ such that $m > 0$, $g(\alpha) \neq 0$, and $g$ is holomorphic at $\alpha$. Thus, $g(z) = \sum_{n \ge 0} a_n(z-\alpha)^n$.
    \item Let $\alpha$ be an essential singularity. Our aim is to show $f(z) = \sum_{n \in \mathbb{Z}} a_n(z-\alpha)^n$.
\end{itemize}

\vspace{1em}
\textbf{Study of Laurent Series}

Let $(f_n)_{n \in \mathbb{Z}}$ be a double-sided sequence of functions.
We say $\sum_{n \in \mathbb{Z}} f_n$ converges (absolutely, normally, uniformly) if both $\sum_{n \ge 0} f_n$ and $\sum_{n < 0} f_n$ converge (absolutely, normally, uniformly).

\textbf{Formal Laurent Series:}
$$ \sum_{n \in \mathbb{Z}} a_n z^n = \sum_{n \ge 0} a_n z^n + \sum_{n < 0} a_n z^n $$
For $\sum_{n \ge 0} a_n z^n$, let the radius of convergence be $\rho_1$. It converges for $|z| < \rho_1$ (uniformly on compact subsets).
For the negative powers, $\sum_{n < 0} a_n z^n = \sum_{m > 0} a_{-m} \left(\frac{1}{z}\right)^m$. Let its radius of convergence be $1/\rho_2$.
It converges for $|z^{-1}| < 1/\rho_2 \implies \rho_2 < |z|$.
Hence, the full Laurent series $\sum_{n \in \mathbb{Z}} a_n z^n$ converges (absolutely, normally, uniformly) for $\rho_2 < |z| < \rho_1$.

Any Laurent series $\sum_{n \in \mathbb{Z}} a_n (z-\alpha)^n$ defines a holomorphic function on the annulus $\rho_2 < |z-\alpha| < \rho_1$, where $\rho_1$ is the ROC of the positive part and $1/\rho_2$ is the ROC of the negative part.
\begin{itemize}
    \item Power Series $\to$ holomorphic function on a disc.
    \item Laurent Series $\to$ holomorphic function on an annulus.
\end{itemize}

Note that if we prove that any holomorphic function on an annulus has a Laurent expansion, then this will imply that for any isolated singularity $\alpha$ of $f$, $f$ has a Laurent expansion around $\alpha$ (since a punctured disk is just an annulus with inner radius $0$).

\vspace{1em}
\noindent \textbf{24-April}

\textbf{Theorem (Laurent Expansion):}
A holomorphic function $f$ on an annulus $\rho_2 < |z-a| < \rho_1$ has a Laurent expansion valid on the annulus.

\textit{Proof:}
We show that for any $\alpha$ in the annulus (so $\rho_2 < |\alpha - a| < \rho_1$), we can pick radii $R_1, R_2$ such that $\rho_2 < R_2 < |\alpha - a| < R_1 < \rho_1$.
We want to express $f(\alpha)$ using Cauchy's Integral Formula on the boundaries of the annulus $\gamma_{R_1}$ and $\gamma_{R_2}$ (circles centered at $a$ with radii $R_1$ and $R_2$).

Consider the function:
$$ g(z) = \begin{cases} \frac{f(z)-f(\alpha)}{z-\alpha} & z \neq \alpha \\ f'(\alpha) & z = \alpha \end{cases} $$
$g(z)$ is holomorphic on the annulus.
We want to integrate $g(z)$ over the boundaries $a+\gamma_{R_1}$ and $a+\gamma_{R_2}$. By introducing cross-cuts (spokes) connecting the inner and outer circles, we can split the annulus into simply connected regions (pieces that fit inside a disc).
For each piece, the boundary forms a closed curve in a simply connected domain. By the Closed Curve Theorem, the integral of $g(z)$ over each such closed boundary is $0$.
When we sum the integrals over all pieces, the integrals along the cross-cuts cancel out (since they are traversed in opposite directions), leaving only the integrals over the outer circle (counter-clockwise) and the inner circle (clockwise).
$$ \int_{a+\gamma_{R_1}} g(z) dz - \int_{a+\gamma_{R_2}} g(z) dz = 0 $$
(The negative sign arises because the standard positive orientation traces the inner circle clockwise).
Hence:
$$ \int_{a+\gamma_{R_1}} g(z) dz = \int_{a+\gamma_{R_2}} g(z) dz $$

Substituting the definition of $g(z)$:
$$ \int_{a+\gamma_{R_1}} \frac{f(z)-f(\alpha)}{z-\alpha} dz = \int_{a+\gamma_{R_2}} \frac{f(z)-f(\alpha)}{z-\alpha} dz $$
$$ \implies \int_{a+\gamma_{R_1}} \frac{f(z)}{z-\alpha} dz - f(\alpha)\int_{a+\gamma_{R_1}} \frac{dz}{z-\alpha} = \int_{a+\gamma_{R_2}} \frac{f(z)}{z-\alpha} dz - f(\alpha)\int_{a+\gamma_{R_2}} \frac{dz}{z-\alpha} $$

Since $\alpha$ lies inside the outer circle $a+\gamma_{R_1}$, the Cauchy integral gives:
$$ \int_{a+\gamma_{R_1}} \frac{dz}{z-\alpha} = 2\pi i $$
Since $\alpha$ lies outside the inner circle $a+\gamma_{R_2}$, the function $\frac{1}{z-\alpha}$ is holomorphic on and inside $a+\gamma_{R_2}$, so:
$$ \int_{a+\gamma_{R_2}} \frac{dz}{z-\alpha} = 0 $$

Substituting these into our equation:
$$ \implies \int_{a+\gamma_{R_1}} \frac{f(z)}{z-\alpha} dz - f(\alpha) (2\pi i) = \int_{a+\gamma_{R_2}} \frac{f(z)}{z-\alpha} dz - f(\alpha) (0) $$
$$ \implies f(\alpha) \cdot 2\pi i = \int_{a+\gamma_{R_1}} \frac{f(z)}{z-\alpha} dz - \int_{a+\gamma_{R_2}} \frac{f(z)}{z-\alpha} dz $$
$$ \implies f(\alpha) = \frac{1}{2\pi i} \int_{a+\gamma_{R_1}} \frac{f(z)}{z-\alpha} dz - \frac{1}{2\pi i} \int_{a+\gamma_{R_2}} \frac{f(z)}{z-\alpha} dz $$
Hence, the representation is proved.

Now, we write series expansions for the terms $\frac{1}{z-\alpha}$.
On the outer circle $a+\gamma_{R_1}$:
We have $|z-a| = R_1$. Since $\alpha$ is inside the annulus, $|\alpha-a| < R_1 = |z-a|$. Thus, $\left| \frac{\alpha-a}{z-a} \right| < 1$.
$$ \frac{1}{z-\alpha} = \frac{1}{(z-a) - (\alpha-a)} = \frac{1}{z-a} \cdot \frac{1}{1 - \frac{\alpha-a}{z-a}} = \sum_{n \ge 0} \frac{(\alpha-a)^n}{(z-a)^{n+1}} $$

On the inner circle $a+\gamma_{R_2}$:
We have $|z-a| = R_2$. Since $\alpha$ is outside the inner circle, $|z-a| = R_2 < |\alpha-a|$. Thus, $\left| \frac{z-a}{\alpha-a} \right| < 1$.
$$ \frac{1}{z-\alpha} = \frac{1}{(z-a) - (\alpha-a)} = \frac{-1}{(\alpha-a)} \cdot \frac{1}{1 - \frac{z-a}{\alpha-a}} = -\sum_{n \ge 0} \frac{(z-a)^n}{(\alpha-a)^{n+1}} $$

Substituting these series back into the integral expressions (and swapping sum and integral due to uniform convergence on the compact boundaries):
$$ f(\alpha) = \frac{1}{2\pi i} \int_{a+\gamma_{R_1}} f(z) \sum_{n \ge 0} \frac{(\alpha-a)^n}{(z-a)^{n+1}} dz + \frac{1}{2\pi i} \int_{a+\gamma_{R_2}} f(z) \sum_{n \ge 0} \frac{(z-a)^n}{(\alpha-a)^{n+1}} dz $$

We can rewrite this in the form of a Laurent series:
$$ f(\alpha) = \sum_{n \ge 0} c_n(\alpha-a)^n + \sum_{n < 0} d_n(\alpha-a)^n $$
Where the coefficients are given by:
$$ c_n = \frac{1}{2\pi i} \int_{a+\gamma_{R_1}} \frac{f(z)}{(z-a)^{n+1}} dz \quad \text{for } n \ge 0 $$
$$ d_n = \frac{1}{2\pi i} \int_{a+\gamma_{R_2}} f(z) (z-a)^{-n-1} dz \quad \text{for } n < 0 $$
(Note that by the deformation of contours, since $f(z)/(z-a)^{n+1}$ is holomorphic in the annulus, we can evaluate these integrals over any simple closed curve in the annulus that encloses the inner hole).

\vspace{1em}
\textbf{Corollary:} Around any point of isolated singularity $a$, a function $f$ has a Laurent expansion valid in some punctured disk $0 < |z-a| < R$.

\textbf{Definition:} The part containing the negative powers, $\sum_{n < 0} d_n(z-a)^n$, is called the \textbf{principal part} of the Laurent series.

We can classify isolated singularities based on the principal part:
\begin{enumerate}
    \item \textbf{Removable Singularity:} Principal part $= 0$ (all $d_n = 0$).
    \item \textbf{Polar Singularity:} Principal part is a finite sum (there exists $m > 0$ such that $d_{-m} \neq 0$ and $d_n = 0$ for all $n < -m$). This is a pole of order $m$.
    \item \textbf{Essential Singularity:} Principal part is an infinite sum (infinitely many $d_n$ are non-zero).
\end{enumerate}

\vspace{1em}
\textbf{Integral Theorem \& Residues}

Let $\alpha$ be an isolated singularity of $f$, and suppose $f$ is holomorphic on a punctured disk $B(\alpha, r) \setminus \{\alpha\}$ for some $r > 0$.
Let $0 < R < r$. We want to evaluate the integral over the circular path $\alpha+\gamma_R$:
$$ \int_{\alpha+\gamma_R} f(z) dz $$

We can write $f(z)$ using its Laurent series expansion around $\alpha$:
$$ f(z) = \sum_{n \in \mathbb{Z}} c_n(z-\alpha)^n $$
Integrating term by term over the closed curve $\alpha+\gamma_R$:
$$ \int_{\alpha+\gamma_R} f(z) dz = \sum_{n \in \mathbb{Z}} c_n \int_{\alpha+\gamma_R} (z-\alpha)^n dz $$
Recall that the integral of $(z-\alpha)^n$ over a closed curve around $\alpha$ is $0$ for all integers $n$ except $n = -1$. For $n = -1$, the integral is $2\pi i$.
$$ \implies \int_{\alpha+\gamma_R} f(z) dz = c_{-1} \cdot 2\pi i $$

\textbf{Definition:} The coefficient of $(z-\alpha)^{-1}$ in the Laurent expansion of $f$ around $\alpha$ (the term at $n = -1$) is called the \textbf{residue} of $f$ at $\alpha$. It is denoted by $\text{Res}(f, \alpha)$.

\vspace{1em}
\textbf{Calculating Residues}

\begin{itemize}
    \item \textbf{At a Removable Singularity:} Since the principal part is zero, $c_{-1} = 0$. Thus, $\text{Res}(f, \alpha) = 0$.

    \item \textbf{At a Polar Singularity (Simple Pole):} Let $\alpha$ be a simple pole (order = 1). The Laurent series starts at $n = -1$:
    $$ f(z) = \sum_{n \ge -1} c_n(z-\alpha)^n = \frac{c_{-1}}{z-\alpha} + c_0 + c_1(z-\alpha) + c_2(z-\alpha)^2 + \dots $$
    Multiply by $(z-\alpha)$:
    $$ (z-\alpha)f(z) = c_{-1} + c_0(z-\alpha) + c_1(z-\alpha)^2 + \dots $$
    Taking the limit as $z \to \alpha$:
    $$ \lim_{z \to \alpha} (z-\alpha)f(z) = c_{-1} $$
    Thus, for a simple pole, $\text{Res}(f, \alpha) = \lim_{z \to \alpha} (z-\alpha)f(z)$.

    \item \textbf{Alternate Form for Simple Pole:} Suppose $f(z) = \frac{A(z)}{B(z)}$ where $A, B$ are holomorphic near $\alpha$, $A(\alpha) \neq 0$, and $B(\alpha) = 0$ but $B'(\alpha) \neq 0$. This guarantees $\alpha$ is a simple pole.
    $$ \text{Res}(f, \alpha) = \lim_{z \to \alpha} (z-\alpha) \frac{A(z)}{B(z)} = \lim_{z \to \alpha} \frac{A(z)}{\frac{B(z)-B(\alpha)}{z-\alpha}} $$
    Since $B(\alpha) = 0$, the denominator is the difference quotient for $B'(z)$ at $\alpha$.
    $$ \text{Res}(f, \alpha) = c_{-1} = \frac{A(\alpha)}{B'(\alpha)} $$
\end{itemize}

\vspace{1em}
\textbf{Exercise:} Let $\alpha$ be a pole of order $m$ ($m > 1$) of $f$. Show that the residue is given by:
$$ \text{Res}(f, \alpha) = \frac{1}{(m-1)!} \lim_{z \to \alpha} \frac{d^{m-1}}{dz^{m-1}} \left[ (z-\alpha)^m f(z) \right] $$
Letting $g(z) = (z-\alpha)^m f(z)$, this becomes $\frac{1}{(m-1)!} \lim_{z \to \alpha} g^{(m-1)}(z)$.

\textbf{Remark:} Unfortunately, there is no explicit closed-form formula like this for calculating the residue at an essential singularity. We typically must rely on finding the full Laurent series expansion to identify $c_{-1}$.
