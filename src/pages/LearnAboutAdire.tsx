
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const LearnAboutAdire = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Art of Adire
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the rich history, cultural significance, and traditional techniques behind Nigeria's beautiful Adire textile art.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* History Section */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">History & Origins</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-lg mb-4">
                    Adire, which means "tie and dye" in Yoruba, is a traditional Nigerian textile art that has been practiced for centuries. 
                    This ancient craft originated among the Yoruba people of southwestern Nigeria and has become a symbol of cultural 
                    identity and artistic expression.
                  </p>
                  <p className="text-lg mb-4">
                    The art form dates back to the early 20th century when Yoruba women began experimenting with indigo dye and 
                    resist techniques to create beautiful patterns on cloth. What started as a way to decorate everyday clothing 
                    evolved into a sophisticated art form that tells stories and preserves cultural heritage.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Techniques Section */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Traditional Techniques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Adire Eleko</h3>
                    <p className="text-muted-foreground">
                      This technique uses starch resist method where cassava starch paste is applied to fabric in intricate patterns 
                      before dyeing. The starch prevents the dye from penetrating certain areas, creating beautiful contrast patterns.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Adire Oniko</h3>
                    <p className="text-muted-foreground">
                      In this tie-and-dye method, various objects like stones, seeds, or coins are tied tightly into the fabric 
                      with raffia or thread before dyeing, creating circular patterns and unique textures.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Adire Alabere</h3>
                    <p className="text-muted-foreground">
                      This stitching technique involves sewing intricate patterns into the fabric before dyeing. The sewn areas 
                      resist the dye, creating detailed geometric and organic designs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Batik Method</h3>
                    <p className="text-muted-foreground">
                      A wax-resist technique where hot wax is applied to fabric in patterns. When dyed, the wax prevents color 
                      absorption, creating detailed and precise designs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cultural Significance */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Cultural Significance</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-lg mb-4">
                    Adire is more than just a textile art; it's a form of cultural communication. Each pattern and design carries 
                    meaning and tells a story. Traditional motifs often represent proverbs, historical events, or aspects of daily life.
                  </p>
                  <p className="text-lg mb-4">
                    The indigo dye used in traditional Adire comes from the indigo plant (Lonchocarpus cyanescens), which has been 
                    cultivated in Nigeria for generations. The deep blue color is not only aesthetically beautiful but also holds 
                    spiritual significance in Yoruba culture.
                  </p>
                  <p className="text-lg">
                    Today, Adire continues to evolve while maintaining its traditional roots. Contemporary artists and designers 
                    are finding new ways to incorporate Adire techniques into modern fashion, keeping this ancient art form alive 
                    for future generations.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Modern Revival */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Modern Revival</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="text-lg mb-4">
                    In recent years, there has been a renewed interest in Adire both within Nigeria and internationally. 
                    Fashion designers, artists, and cultural enthusiasts are embracing this traditional art form, bringing 
                    it to global runways and modern wardrobes.
                  </p>
                  <p className="text-lg mb-4">
                    At JUWURA, we are committed to preserving and promoting this beautiful tradition. Each piece in our collection 
                    is carefully crafted by skilled artisans who have inherited these techniques from their ancestors. We work 
                    directly with local communities to ensure that the art of Adire continues to thrive.
                  </p>
                  <p className="text-lg">
                    When you wear Adire, you're not just wearing clothing – you're carrying a piece of Nigerian heritage, 
                    supporting traditional craftsmanship, and helping to preserve an ancient art form for future generations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Adire Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img 
                src="/lovable-uploads/a7ef2da9-2247-4f05-ba5c-efec7d892e59.png" 
                alt="Traditional Adire Pattern 1" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="/lovable-uploads/a2099c47-d2ff-4315-9305-6bb31f9b9690.png" 
                alt="Traditional Adire Pattern 2" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="/lovable-uploads/ab886f50-4cd4-443a-b09b-0ac7308a40d4.png" 
                alt="Traditional Adire Pattern 3" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LearnAboutAdire;
