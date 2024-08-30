import { Box, Grid, GridItem, HStack, Heading, Text } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { handleShareLink } from "../utils/dateTimeConversion";

const Event = () => {
  return (
    <div className="bg-slate-200">
      <Box
        className="flex bg-white"
        bg="blue.500"
        marginBlock={"50"}
        marginInline={"200px"}
      >
        <div className="p-4">
          <img
            className="object-cover h-24 w-24"
            src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
          />
        </div>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
        >
          <Heading noOfLines={1} size="lg" fontSize="25px" fontWeight={600}>
            Basic text writing, including headings, body text, lists, and more.
          </Heading>
          <HStack marginBottom={10}>
            <Text>Fri Jun 23, 2023</Text>
            <AiOutlineShareAlt onClick={handleShareLink} />
            <AiOutlineHeart />
          </HStack>
        </Box>
      </Box>

      <Grid
        templateColumns="70% 30%"
        gap={50}
        marginBlock={"50"}
        marginInline={"200px"}
      >
        <GridItem w="100%" h="10" bg="blue.500">
          <img
            style={{
              marginBottom: "10px",
            }}
            src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
            alt=""
          />
          <div itemProp="description" className="event-description-html">
            <p>
              <strong>About the event</strong>
            </p>
            <p>
              <br />
            </p>
            <p>
              <strong>
                There are several industrial exhibitions that take place in
                Surat throughout the year showcasing products and services
                related to various industries such as manufacturing engineering
                MACHINE TOOL | POWER TOOL | HAND TOOL | WELDING/ CUTTING |
                TEXTILE / DIAMOND/ EMBROIDERY | MATERIAL HANDLING | CONSTRUCTION
                | WEIGHING | TEXTILE MACHINERY ELECTRICAL - ELECTRONICS | SOLAR
                / SAFETY | I.T. &amp; MANY MORE. Some of the popular exhibitions
                in Surat include:
              </strong>
            </p>
            <p>
              <br />
            </p>
            <p>
              <strong>A MEGA INDUSTRIAL EXHIBITION&nbsp;(ENGIEXPO):</strong>
              &nbsp;<strong>ENGIEXPO&nbsp;Industrial Exhibition</strong> is one
              of the largest machine tools exhibitions in India and attracts
              visitors from all over the country. The event showcases the latest
              technologies and products related to machine tools automation and
              robotics.
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>ENGIEXPO Exhibition: </strong>
              The&nbsp;ENGIEXPO&nbsp;Exhibition is organized by the
              <strong>&nbsp;2WAY ADVERTISING</strong>&nbsp;and is a platform for
              manufacturers suppliers and service providers to showcase their
              products and services related to the engineering industry.
            </p>
            <p>
              The industrial exhibitions that take place in Surat. If you are
              interested in attending an exhibition you can search online for
              more information about upcoming events and their schedules.
            </p>{" "}
          </div>
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500"></GridItem>
      </Grid>
      {/* <main className="flex pt-8 pb-16 lg:pt-16 lg:pb-24 bg-slate-200">
        <div className="flex justify-between p-8 max-w-screen-xl bg-white">
          <article className="w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <img
              style={{
                marginBottom: "10px",
              }}
              src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
              alt=""
            />
            <h2>Getting started with Flowbite</h2>
            <div itemProp="description" className="event-description-html">
              <p>
                <strong>Engiexpo Industrial Exhibition Surat- 2024</strong>
              </p>
              <p>
                <br />
              </p>
              <p>
                <strong>
                  There are several industrial exhibitions that take place in
                  Surat throughout the year showcasing products and services
                  related to various industries such as manufacturing
                  engineering MACHINE TOOL | POWER TOOL | HAND TOOL | WELDING/
                  CUTTING | TEXTILE / DIAMOND/ EMBROIDERY | MATERIAL HANDLING |
                  CONSTRUCTION | WEIGHING | TEXTILE MACHINERY ELECTRICAL -
                  ELECTRONICS | SOLAR / SAFETY | I.T. &amp; MANY MORE. Some of
                  the popular exhibitions in Surat include:
                </strong>
              </p>
              <p>
                <br />
              </p>
              <p>
                <strong>A MEGA INDUSTRIAL EXHIBITION&nbsp;(ENGIEXPO):</strong>
                &nbsp;<strong>ENGIEXPO&nbsp;Industrial Exhibition</strong> is
                one of the largest machine tools exhibitions in India and
                attracts visitors from all over the country. The event showcases
                the latest technologies and products related to machine tools
                automation and robotics.
              </p>
              <p>&nbsp;</p>
              <p>
                <strong>ENGIEXPO Exhibition: </strong>
                The&nbsp;ENGIEXPO&nbsp;Exhibition is organized by the
                <strong>&nbsp;2WAY ADVERTISING</strong>&nbsp;and is a platform
                for manufacturers suppliers and service providers to showcase
                their products and services related to the engineering industry.
              </p>
              <p>
                The industrial exhibitions that take place in Surat. If you are
                interested in attending an exhibition you can search online for
                more information about upcoming events and their schedules.
              </p>{" "}
            </div>

            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion (20)
                </h2>
              </div>
            </section>
          </article>
        </div>
        <div className="flex justify-between p-8 max-w-screen-xl bg-white">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <img
              style={{
                marginBottom: "10px",
              }}
              src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
              alt=""
            />
            <h2>Getting started with Flowbite</h2>
            <div itemProp="description" className="event-description-html">
              <p>
                <strong>Engiexpo Industrial Exhibition Surat- 2024</strong>
              </p>
              <p>
                <br />
              </p>
              <p>
                <strong>
                  There are several industrial exhibitions that take place in
                  Surat throughout the year showcasing products and services
                  related to various industries such as manufacturing
                  engineering MACHINE TOOL | POWER TOOL | HAND TOOL | WELDING/
                  CUTTING | TEXTILE / DIAMOND/ EMBROIDERY | MATERIAL HANDLING |
                  CONSTRUCTION | WEIGHING | TEXTILE MACHINERY ELECTRICAL -
                  ELECTRONICS | SOLAR / SAFETY | I.T. &amp; MANY MORE. Some of
                  the popular exhibitions in Surat include:
                </strong>
              </p>
              <p>
                <br />
              </p>
              <p>
                <strong>A MEGA INDUSTRIAL EXHIBITION&nbsp;(ENGIEXPO):</strong>
                &nbsp;<strong>ENGIEXPO&nbsp;Industrial Exhibition</strong> is
                one of the largest machine tools exhibitions in India and
                attracts visitors from all over the country. The event showcases
                the latest technologies and products related to machine tools
                automation and robotics.
              </p>
              <p>&nbsp;</p>
              <p>
                <strong>ENGIEXPO Exhibition: </strong>
                The&nbsp;ENGIEXPO&nbsp;Exhibition is organized by the
                <strong>&nbsp;2WAY ADVERTISING</strong>&nbsp;and is a platform
                for manufacturers suppliers and service providers to showcase
                their products and services related to the engineering industry.
              </p>
              <p>
                The industrial exhibitions that take place in Surat. If you are
                interested in attending an exhibition you can search online for
                more information about upcoming events and their schedules.
              </p>{" "}
            </div>

            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion (20)
                </h2>
              </div>
            </section>
          </article>
        </div>
      </main> */}

      {/* <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                  className="mb-5 rounded-lg"
                  alt="Image 1"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first office</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </article>
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                  className="mb-5 rounded-lg"
                  alt="Image 2"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Enterprise design tips</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 12 minutes
              </a>
            </article>
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
                  className="mb-5 rounded-lg"
                  alt="Image 3"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">We partnered with Google</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 8 minutes
              </a>
            </article>
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
                  className="mb-5 rounded-lg"
                  alt="Image 4"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first project with React</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 4 minutes
              </a>
            </article>
          </div>
        </div>
      </aside> */}

      {/* <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Sign up for our newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
              Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email.
            </p>
            <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    required=""
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                We care about the protection of your data.{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read our Privacy Policy
                </a>
                .
              </div>
            </form>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Event;
