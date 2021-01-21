// Adopted from https://github.com/rust-num/num-complex

class Complex<T extends number> {
  // Real part of complex number.
  re: T;
  // Imaginary part of complex number.
  im: T;
  constructor(re: T, im: T) {
    this.re = re;
    this.im = im;
  }
  
  // `i`, the imaginary unit
  i(): Complex<T> {
    return complex(0, 1) as Complex<T>
  }

  // Square of norm for T.
  // re^2 + im^2
  norm_sqr(): T {
    return this.re ** 2 + this.im ** 2 as T
  }
  
  // Multiply by scalar `T`
  scale(t: T): Complex<T> {
    return complex(this.re * t, this.im * t) as Complex<T>
  }

  // Divide by scalar `T'
  unscale(t: T): Complex<T> {
    return complex(this.re / t, this.im / t) as Complex<T>
  }

  // TODO: implement power

  // Conjugate of the complex number, also a complex. 
  // a - ib
  conj(): Complex<T> {
    return complex(this.re, -this.im) as Complex<T>
  }
  
  // Inverse of complex number.
  inv(): Complex<T> {
    let nsq = this.norm_sqr();
    return complex(
      this.re / nsq,
      -this.im / nsq
    ) as Complex<T>
  }
  
  // Returns the L1 norm `|re| + |im|`
  // https://en.wikipedia.org/wiki/Taxicab_geometry
  l1_norm(): T {
    return Math.abs(this.re) + Math.abs(this.im) as T
  }
  
  // Modulus of complex number
  norm(): T {
    return Math.sqrt(this.norm_sqr()) as T
  }
  
  // Principal argument of complex number
  arg(): T {
    return Math.atan2(this.im, this.re) as T
  }
  
  // Polar form of the complex number
  // r * exp(i * theta)
  to_polar(): [T, T] {
    return [this.norm(), this.arg()]
  }

  // Convert polar representation into complex number
  from_polar(r: T, theta: T): Complex<T> {
    return complex(r * Math.cos(theta), r * Math.sin(theta)) as Complex<T>
  }
  
  // Exponetial of complex number.
  // e^(z) where e is base of nlog.
  exp(): Complex<T> {
    return this.from_polar(Math.exp(this.re) as T, this.im)
  }

  // Natural logarithm of complex number
  ln(): Complex<T> {
    let [r, theta] = this.to_polar();
    return complex(Math.log(r), theta) as Complex<T>
  }

}

/**
 * Create a new complex number with its real and imaginary parts.
 * Drop-in replacement for Go & Python `complex()` function.
 * 
 * @param r real part of complex number
 * @param i imaginary part of complex number
 */
export function complex(r: number, i: number): Complex<number> {
  return new Complex(r, i)
}

