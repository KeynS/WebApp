using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class Singleton
    {
        private static DefaultService instanse;

        public static DefaultService getInstance()
        {
            if (instanse == null)
                instanse = new DefaultService();
            return instanse;
        }
    }
}
