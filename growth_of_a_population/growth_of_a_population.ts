export class G964 {
  public static nbYear = (p0, percent, aug, p) =>
    p0 >= p ? 0 : G964.nbYear(Math.floor(p0 * (percent / 100 + 1)) + aug, percent, aug, p) + 1;
}
