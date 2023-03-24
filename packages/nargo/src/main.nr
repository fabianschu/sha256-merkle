use dep::std;

fn main(x: pub [u8; 32]) -> pub [u8; 32] {
    std::hash::sha256(x)
}