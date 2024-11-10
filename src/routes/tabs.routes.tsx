import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home/Home";
import { BookmarkSimple, House, MagnifyingGlass } from "phosphor-react-native";
import { Details } from "../screens/Details/Details";
import { MyList } from "../screens/MyList/MyList";
import { Search } from "../screens/Search/Search";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#242a32",
                    height: 78,
                    borderTopWidth: 1,
                    borderTopColor: "#0296e5",
                    justifyContent: "space-around", // Distribui os itens ao longo da barra
                },
                tabBarItemStyle: {
                    justifyContent: "center", // Centraliza o ícone verticalmente
                    alignItems: "center", // Centraliza o ícone horizontalmente
                    paddingBottom: 10, // Dá um espaço no fundo para evitar sobreposição
                },
                headerShown: false,
                tabBarActiveTintColor: "#0296e5",
                tabBarInactiveTintColor: "#67686d",
                tabBarShowLabel: false,
            }}
        >

            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <House color={color} size={30} weight="light" />
                    )
                }}
            />
            <Screen
                name="Details"
                component={Details}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Screen
                name="MyList"
                component={MyList}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BookmarkSimple color={color} size={30} weight="light" />
                    )
                }}
            />
            <Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MagnifyingGlass color={color} size={30} weight="light" />
                    )
                }}
            />
        </Navigator>
    );
}