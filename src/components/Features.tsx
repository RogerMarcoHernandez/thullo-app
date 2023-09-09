import { FaCog, FaTasks, FaUsers } from "react-icons/fa";

const Features = () => (
  <section className="py-12">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <FaTasks name="tasks" size={24} className="text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Task Management</h3>
          <p className="text-gray-600">
            Easily create, organize, and manage tasks with our intuitive
            interface.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <FaUsers name="users" size={24} className="text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Real-Time Collaboration
          </h3>
          <p className="text-gray-600">
            Work together seamlessly with real-time updates, live chat, and
            collaborative task management.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <FaCog name="cog" size={24} className="text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Customizable Workflows</h3>
          <p className="text-gray-600">
            Tailor Thullo to your specific requirements with custom boards,
            lists, and task templates.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
